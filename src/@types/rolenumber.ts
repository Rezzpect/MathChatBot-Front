export const ROLE_NO = { '1':'STUDENT', '2': 'TEACHER', '3': 'EXPERIMENT', }

export type RoleId = (typeof ROLE_NO)[keyof typeof ROLE_NO]