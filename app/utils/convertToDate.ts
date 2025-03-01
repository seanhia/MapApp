import { Timestamp } from "firebase/firestore";

const convertToDate = (input: any): Date => {
    return input instanceof Timestamp ? input.toDate() : new Date(input);
};

export default convertToDate;