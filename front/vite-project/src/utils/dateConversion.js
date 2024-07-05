export const dateToString = (dateString)=>{
    // Obtener día, mes y año del objeto Date
    const date =  new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0'); 
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
    const year = date.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
}


export const dateStringtoDatedate = (string)=> {
    const parts = string.split("-");
    return new Date(parts[0],parts[1]-1,parts[2]);
}


export const diffDays = (dateObject) => {

    const ya = dateObject.getFullYear()
    const ma = dateObject.getMonth()
    const da =dateObject.getDate()
    const ty = new Date().getFullYear();
    const tm = new Date().getMonth();
    const td = new Date().getDate();
    return (ya-ty)*365 + (ma-tm)*31 + (da-td);
}