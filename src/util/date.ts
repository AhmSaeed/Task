import moment from "moment";

export const getYYYY_MM_DD = (date: Date) => {
    return moment(date).format("YYYY-MM-DD");
};

export const getGreetingTime = () => {
    let today = new Date();
    let currentHr = today.getHours();
    
    if (currentHr < 12) {
        return 'morning'
    }
    else if (currentHr < 18) {
        return 'afternoon'
    }
    else {
        return 'evening'
    }
}