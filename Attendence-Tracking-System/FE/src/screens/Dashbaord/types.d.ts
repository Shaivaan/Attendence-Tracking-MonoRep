interface CountCardType {
    cardType:keyof DashboardDataType
}

interface CardType{
  cardType:CountCardType
}

interface IsMarkAttendenceType{
   isMarkAttendence? : boolean 
}

interface SuccessDashboardDataType {
  data : {
    checkIn:number
    checkOut:number
    totalAttendee:number
  }
}

interface SuccessObj{
  success:boolean
}