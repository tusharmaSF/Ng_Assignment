

enum Roles {
    Manager = "Manager",
    Developer = "Developer",
    SuperAdmin = "SuperAdmin",
    Admin = "Admin",
    Subscriber = "Subscriber",
}

export class UserModel{

    id: number = 0;
    firstName: string = '';
    middleName: string = '';
    lastName: string = '';
    eMail: string = '';
    phoneNo: string = '';
    _Role: Roles = Roles.Subscriber;
    addRess: string = '';
    doe: string = '';
}
