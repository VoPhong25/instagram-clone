export const isReqUser = (userId1, userId2) => {
    if (userId1 && userId2)
        return userId1 === userId2
}

function getTimeInHours(timestamp){
    const date = new Date(timestamp);
    const hours = date.getHours();
    return hours;
}

export const hasStory = (users) => {
    const temp = users.reduce((acc, item) => {
        if (item.stories?.length>0){
            const time = getTimeInHours(
            item.stories[item.stories?.length-1].timestamp
            );
            if(time<24) {
                acc.push(item);
            }
        }
        return acc;
    }, []);
    return temp;
}

export const timeDifference = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = (now - date) / 1000; // đổi sang giây

    const second = 1;
    const minute = 60;
    const hour = 60 * 60;
    const day = 60 * 60 * 24;
    const week = 60 * 60 * 24 * 7;

    if (diff < second) {
        return "now";
    } else if (diff < minute) {
        const seconds = Math.floor(diff / second);
        return `${seconds} second ago`;
    } else if (diff < hour) {
        const mins = Math.floor(diff / minute);
        return `${mins} min ago`;
    } else if (diff < day) {
        const hours = Math.floor(diff / hour);
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (diff < week) {
        const days = Math.floor(diff / day);
        return `${days} day${days > 1 ? 's' : ''} ago`;
    } else {
        const weeks = Math.floor(diff / week);
        return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    }
};
