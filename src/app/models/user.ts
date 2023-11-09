export interface User {
    uid: string;
    email: string;
    first_name: string;
    last_name: string;
    phone: string;
    address: string;
    commune: string;
    role: 'student' | 'teacher' | 'admin';
}