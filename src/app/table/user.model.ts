
function getDate(){
    return function(target: any, key: string){
        let val = target[key];
        const getter = () => {
            return val;
        };
        const setter = (next: any) => {
                let d = new Date();
                val = d.toString();
        };
        Object.defineProperty(target, key,{
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true,
        })
    };
};

enum Roles {
    Manager = "Manager",
    Developer = "Developer",
    SuperAdmin = "SuperAdmin",
    Admin = "Admin",
    Subscriber = "Subscriber",
}

export class UserModel{

    @getDate()  
    doe: string = '';

    id: number = 0;
    firstName: string = '';
    middleName: string = '';
    lastName: string = '';
    eMail: string = '';
    phoneNo: string = '';
    _Role: Roles = Roles.Subscriber;
    addRess: string = '';

}
