interface EntryType{
    email : string
    name :string
    photo :string
    entryType : 'login' | 'logout'
    entryTime : string
}
type FormEntry = Pick<EntryType, 'email' | 'name' | 'photo'>;