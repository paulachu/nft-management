export class AuthFunction {
    static isAdmin(data: any): boolean {
        return data.role == "admin";
    }
}