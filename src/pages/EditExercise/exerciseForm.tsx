import { useEffect, useMemo, useState } from 'react';

import RichEditor from '../../components/RichEditor';
import type { QuestionData, QuestionForm, QuestionFormValidate } from '../../@types/question';
import supabaseClient from '../../utils/SupabaseClient';
import InputForm from '../../components/Form/inputForm';
import { IoIosArrowDown } from 'react-icons/io';
import type { ExistingImage, UploadedImage } from '../../@types/richeditor';
import { useNavigate, useParams } from 'react-router-dom';
import { FaSave } from 'react-icons/fa';
import toast from 'react-hot-toast';

type tagRecord = {
    tag_id: number,
    tag_name: string
}

export default function ExerciseForm() {
    const { topicId, questionId } = useParams();
    const navigate = useNavigate();
    const [tagsList, setTagsList] = useState<tagRecord[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [courseId, setCourseId] = useState<string>('');
    const difficulty_list = ['Easy', 'Normal', 'Hard'];

    const isEdit = useMemo(() => { return Boolean(questionId) }, [])

    const [questionForm, setQuestionForm] = useState<QuestionForm>({
        title: '',
        question: '',
        answer: '',
        tags: [],
        difficulty: 'Easy',
        is_published: false
    });
    const [formError, setFormError] = useState<Partial<QuestionForm>>({});
    const [imagesToUpload, setImagesToUpload] = useState<UploadedImage[]>([]);
    const [existingImages, setExistingImages] = useState<ExistingImage[]>([]);
    const [uploadedImages, setUploadedImages] = useState<string[]>([]);

    const handleQuestionChange = (content: string) => {
        setQuestionForm((prev) => ({ ...prev, question: content }));
    };

    const createTagsMap = (tags: tagRecord[]) => {
        const tagMap = Object.fromEntries(tags.map((t: tagRecord) => [t.tag_name, t.tag_id]))
        return tagMap
    }

    const createQuestion = async (question: string) => {
        const { data, error } = await supabaseClient.functions.invoke('create-question', {
            method: 'POST',
            body: {
                "topic_id": topicId,
                "title": questionForm.title,
                "question": question,
                "answer": questionForm.answer,
                "difficulty": "Easy",
                "is_published": questionForm.is_published,
                "tags": questionForm.tags
            }
        })

        if (error) throw error

        if (data) return data.data;
    }

    const editQuestion = async (question: string, question_id?: string) => {
        const { error } = await supabaseClient.functions.invoke('edit-question', {
            method: 'PUT',
            body: {
                "question_id": isEdit ? questionId : question_id,
                "title": questionForm.title,
                "question": question,
                "answer": questionForm.answer,
                "difficulty": questionForm.difficulty,
                "is_published": questionForm.is_published,
                "new_tags": questionForm.tags
            }
        })

        if (error) {
            toast.error('Something went wrong');
            throw error;
        }
    }

    const getQuestionData = async () => {
        setIsLoading(true)
        try {
            const { data: question_data, error: question_error } = await supabaseClient.functions.invoke('question-detail', {
                method: 'POST',
                body: {
                    "question_id": questionId
                }
            })

            const { data: answer } = await supabaseClient.functions.invoke('question-answer', {
                method: 'POST',
                body: {
                    "question_id": questionId
                }
            })

            const { data:tag_data, error:tag_error } = await supabaseClient.functions.invoke('all-question-tag', {
                method: 'GET'
            })

            if (tag_error) throw tag_error

            if (tag_data) {
                setTagsList([...tag_data.data])
            }

            if (question_error) throw question_error;
            if (tag_error) throw tag_error;

            if (question_data.data[0].length === 0) {
                navigate('/', { replace: true })
            }

            if (question_data) {
                const QuestionData: QuestionData = question_data.data[0]
                setCourseId(QuestionData.course_id);
                //create map of tag name and tag id for easier access when edit question tag
                const tagMap = createTagsMap([...tag_data.data]);

                const tags_id = (tagMap && QuestionData.tag_names[0])
                    ? QuestionData.tag_names.map((name) => (tagMap[name].toString()))
                    : []

                const existing_url = extractImageUrls(QuestionData.question).map((url) => ({
                    url,
                    path: urlToStoragePath(url),
                }));

                if (existing_url.length > 0) setExistingImages(existing_url);

                setQuestionForm((prev) => ({
                    ...prev,
                    title: QuestionData.title,
                    question: QuestionData.question,
                    tags: tags_id,
                    difficulty: QuestionData.difficulty,
                    is_published: QuestionData.is_published,
                    answer: answer.data[0].answer
                }))
            }
        } catch (error) {
            toast.error('Unexpected error occurred');
            navigate(`/topic/${topicId}`, { replace: true });
        } finally {
            setIsLoading(false);
        }
    }

    const validate = () => {
        const rules: Array<{ key: keyof QuestionFormValidate, condition: boolean, message: string }> = [
            {
                key: 'title',
                condition: (!questionForm.title),
                message: "Please fill in the course name"
            },
            {
                key: 'answer',
                condition: (!questionForm.answer),
                message: "Please fill in the answer"
            },
        ]

        const result = rules.reduce((errors, { key, condition, message }) => {
            if (condition) errors[key] = message
            return errors;
        }, {} as Partial<QuestionFormValidate>);

        if (Object.keys(result).length !== 0) return result
    };

    const extractImageUrls = (html: string): string[] => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return Array.from(doc.querySelectorAll('img')).map((img) => img.src);
    };

    const urlToStoragePath = (url: string): string => {
        return url.split(`/storage/v1/object/public/question_image/`)[1];
    };

    const ErrorCleanup = async () => {
        const remove_path = uploadedImages.map((img) => urlToStoragePath(img));
        await supabaseClient.storage.from('question_image').remove(remove_path);
    }

    //remove image that exist in storage but not in question content anymore
    const RemoveExistingImage = async () => {
        if (Object.keys(existingImages).length === 0) return;

        //extract current url in question and compare with existing image to determine which image need to be deleted
        const current_url = extractImageUrls(questionForm.question);
        const remove_exist_img = existingImages.filter((img) => !current_url.includes(img.url));

        if (remove_exist_img.length > 0) {
            const remove_paths = remove_exist_img.map((img) => img.path);
            const { error } = await supabaseClient.storage.from('question_image').remove(remove_paths);

            if (error) {
                toast.error('Failed to update image')
                throw error;
            }
        }
    }

    const ChangeUrl = async (question_id?: string) => {
        //extract current url in question and compare with existing image and new uploaded image to determine which image 
        //need to be upload and which image need to be deleted
        const current_url = extractImageUrls(questionForm.question);

        //filter the image that need to be upload and deleted
        const upload_url = imagesToUpload.filter((img) => current_url.includes(img.url))
        const deleted_url = imagesToUpload.filter(
            (img) => !current_url.includes(img.url)
        );
        //revoke url that are not used to prevent memory leak
        deleted_url.forEach((item) => { URL.revokeObjectURL(item.url) });

        let course_id = '';

        if (question_id) {
            const { data: question_data, error } = await supabaseClient.functions.invoke('question-detail', {
                method: 'POST',
                body: {
                    "question_id": question_id
                }
            })
            if (error) {
                toast.error('Failed to upload image');
                throw error;
            } else course_id = question_data.data[0].course_id;
        }

        let final_content = questionForm.question
        //upload new image to storage and replace url in question to new url from storage
        for (const img of upload_url) {
            const fileName = 'img' + Date.now()
            const storagePath = `${courseId === '' ? course_id : courseId}/${questionId ?? question_id}/${fileName}`

            const { error } = await supabaseClient.storage.from('question_image').upload(storagePath, img.file)

            if (error) {
                toast.error('Failed to upload image');
                throw error;
            }

            const { data: { publicUrl } } = supabaseClient.storage.from('question_image').getPublicUrl(storagePath);

            setUploadedImages((prev) => ([...prev, publicUrl]));
            final_content = final_content.replace(img.url, publicUrl);
            URL.revokeObjectURL(img.url);
        }
        setQuestionForm((prev) => ({ ...prev, question: final_content }));
        return final_content
    }

    const handleSubmit = async () => {
        let question_id = '';

        setIsLoading(true);
        try {
            const error = validate();

            if (error) {
                setFormError(error);
                toast.error('invalid form')
                return
            } else {
                setFormError({});
            }

            let final_content = ''

            if (!isEdit) {
                question_id = await createQuestion(questionForm.question)
                final_content = await ChangeUrl(question_id);
                await editQuestion(final_content, question_id);
                navigate(`/topic/${topicId}`);
            } else {
                final_content = await ChangeUrl();
                await editQuestion(final_content);
            }
            setQuestionForm((prev) => ({ ...prev, question: final_content }));
            const existing_url = extractImageUrls(final_content).map((url) => ({
                url,
                path: urlToStoragePath(url),
            }));

            if (existing_url.length > 0) setExistingImages(existing_url);
            toast.success('Question saved sucessfully!');
        } catch (error) {
            ErrorCleanup();
            if (!isEdit) {
                navigate(`/topic/${topicId}/editquestion/${question_id}`);
            }
        } finally {
            RemoveExistingImage();
            setIsLoading(false);
        }

    }
    const getTagsList = async () => {
        const { data, error } = await supabaseClient.functions.invoke('all-question-tag', {
            method: 'GET'
        })

        if (error) throw error

        if (data) {
            setTagsList([...data.data]);
        }

    };

    useEffect(() => {
        if (isEdit) {
            getQuestionData();
        }else getTagsList();
    }, [isEdit])

    useEffect(() => {
        return () => {
            imagesToUpload.forEach((img) => URL.revokeObjectURL(img.url))
        }
    }, [imagesToUpload])

    const onCheckTag = (tag_id: string) => {
        setQuestionForm((prev) => ({
            ...prev,
            tags: prev.tags && prev.tags?.includes(tag_id)
                ? prev.tags.filter((id) => id !== tag_id)
                : [...prev.tags, tag_id]
        }))
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value, id } = e.target;
        setQuestionForm((prev) => ({ ...prev, [id]: value }))
    }

    return (
        <div className='py-5 min-h-[400px]'>
            <div className='flex flex-col gap-5 w-full' onSubmit={handleSubmit}>
                <InputForm
                    name='Question Title'
                    error={formError['title']}
                    id='title'
                    type='text'
                    value={questionForm.title}
                    onChange={handleInputChange}
                    readOnly={isLoading}
                />

                <RichEditor
                    setImagesToUpload={setImagesToUpload}
                    value={questionForm.question}
                    onChange={handleQuestionChange}
                    readOnly={isLoading}
                />

                <InputForm
                    name='Answer'
                    error={formError['answer']}
                    id='answer'
                    type='text'
                    value={questionForm.answer}
                    placeholder='ใส่คำตอบ'
                    onChange={handleInputChange}
                    readOnly={isLoading}
                />


                <div className='flex gap-5 w-ful items-end'>
                    <div className='flex flex-col gap-2 w-[80%]'>
                        <header className='font-bold'>Difficulty</header>
                        <div className="dropdown border border-neutral rounded-lg">
                            <div tabIndex={0} role="button" className="flex justify-between font-bold items-center gap-2 hover:cursor-pointer hover:bg-base-300 p-2 rounded-lg">
                                <header>{questionForm.difficulty}</header><IoIosArrowDown />
                            </div>
                            <ul id={'difficulty-dropdown'} tabIndex={-1} className="dropdown-content font-bold menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                                {difficulty_list.map((mode_name, index) =>
                                    <li key={`difficulty-${index}`}><a onClick={() => {
                                        setQuestionForm((prev) => ({ ...prev, difficulty: mode_name }))
                                        document.getElementById('difficulty-dropdown')?.blur();
                                    }}>{mode_name}</a></li>
                                )}
                            </ul>
                        </div>
                    </div>

                    <label className="flex items-center gap-2 rounded-full bg-white border border-black py-2 px-5 h-fit text-black font-bold text-md" htmlFor="is_publish">
                        <input className="checkbox checkbox-primary rounded-lg" id="is_publish" checked={questionForm.is_published} onChange={() => setQuestionForm((prev) => ({ ...prev, is_published: !questionForm.is_published }))} type="checkbox" />
                        <div className='line-clamp-1' title='เผยแพร่?'>
                            เผยแพร่
                        </div>
                    </label>
                </div>

                <div className='flex flex-col gap-2'>
                    <header className='font-bold'>Tags</header>
                    <div className='flex w-full flex-wrap gap-2'>
                        {
                            tagsList && tagsList.map((tag) => (
                                <span className={`badge badge-sm cursor-pointer 
                                ${(questionForm.tags.length > 0) && questionForm.tags?.includes(tag.tag_id.toString())
                                        ? 'badge-accent text-white'
                                        : 'badge-accent/50 text-accent border border-accent'}`}
                                    key={`tag-${tag.tag_id}`}
                                    onClick={() => onCheckTag(tag.tag_id.toString())}>
                                    {tag.tag_name}
                                </span>
                            ))
                        }
                    </div>
                </div>

                <div className="flex justify-end gap-2 w-full mt-10">
                    <button className="btn bg-primary text-primary-content rounded-full" type='button' onClick={handleSubmit} disabled={isLoading}>{isLoading ? <span className='loading loading-spin' /> : <>บันทึก<FaSave /></>}</button>
                </div>

            </div >

        </div >
    )
}