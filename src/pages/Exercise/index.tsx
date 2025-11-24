export default function ExercisePage() {
    return (
        <div className="h-[calc(100vh-65px)] min-h-fit flex justify-center items-center py-10 px-15 gap-15">
            <div className="flex flex-col bg-neutral rounded-lg w-[60%] h-full shadow-sm p-5 gap-2">
                <header className="font-bold text-2xl">โจทย์ปัญหาการบวก ลบระคน</header>
                <p>ธีรุสมีเงิน 10,000  บาท ซื้อกระเป๋า 3,450 บาท ซื้อชุดทำงาน 2,456 บาท ธีรุสเหลือเงินกี่บาท?</p>
                <div className="flex justify-center w-full">
                    <img className="flex w-50 h-50 justify-center" src="https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"></img>
                </div>
                
                <div className="bg-white rounded-lg w-auto h-full mt-2 mx-5">
                    <textarea className="textarea focus:outline-none w-full h-[80%]" placeholder="write your answer here"></textarea>
                    <div className="flex justify-end items-center px-5 w-full h-[20%]">
                        <div className="btn bg-primary text-primary-content rounded-full">ส่งคำตอบ</div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center bg-neutral rounded-lg w-[40%] h-full shadow-sm px-10">
                <header>AI Agent Math Chatbot</header>
                <div className="bg-white rounded-lg h-[80%] w-full border-1 border-black">

                </div>
                <div className="flex justify-center mt-5 h-[6%] w-full gap-2 px-2">
                    <input type="text" placeholder="Type here" className="input rounded-xl w-full focus:outline-none" />
                    <button className="btn rounded-xl bg-primary text-primary-content">Send</button>
                </div>
            </div>
        </div>
    )
}