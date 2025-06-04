interface CountCardType {
    cardType:keyof DashboardDataType
}

interface CardType{
  cardType:CountCardType
}

interface IsMarkAttendenceType{
   isMarkAttendence? : boolean 
}