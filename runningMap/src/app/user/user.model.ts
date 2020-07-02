export class User {
    constructor(
        public firstname: string,
        public lastname: string,
        public pseudo: string,
        public mail: string,
        public city: string,
        public gender: string,
        public age: number,
        public password: string,
        public is_active: string,
        public token: string
    ){}
} 