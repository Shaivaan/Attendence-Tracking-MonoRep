type NullNumber = null | number;

interface DashboardDataType {
    checkIn:NullNumber
    checkOut:NullNumber
    totalAttendee:NullNumber 
    isLoading:boolean,
    isLoadedOnce:boolean
  }

interface StoreType {
  dashboardData : DashboardDataType
  handleDashboardData : (data : DashboardDataType)=>void
}