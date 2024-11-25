module default {
    scalar type UserId extending sequence;

    type User{
        required property uid: UserId {
            constraint exclusive;
        };
        required property fullName: str;
        required property email: str;
        required property password: str;
        required property enrolled: array<int32>{
        default := <array<int32>>[];
    }
    }

    type Course{
        required property cid: int32;
        required property img: str;
        required property title: str;
        required property skills: str;
        required property price: float64;
        required property rating: float64;
        required property duration: int32;
        required property tag: str;
    }
}
