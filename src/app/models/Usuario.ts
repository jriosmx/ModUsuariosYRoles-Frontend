export class Usuario {
    id:number;
    name:string;
    lastname:string;
    username:string;
    email:string;
    password:string;
    //Create a Set
    // roles = new Set<string>(['ROLE_USER', 'ROLE_ADMIN']);
    // roles:Set<string>;
    // roles:any;
    
    role:string[];
}
