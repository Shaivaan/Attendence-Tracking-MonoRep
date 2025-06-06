interface HistoryCardType{
    email: string
    name: string
    checkIn: TimePhoto
    checkout: TimePhoto
};

interface TimePhoto{
    time: string
    photo: string
};

interface HistoryResType{
    success:boolean
    data : HistoryCardType[]
}