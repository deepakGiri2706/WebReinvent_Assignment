export const catchErr=(error:any)=>{
    // can handle to throw err using env varialble and can log too using (data dog, new relic etc)
    console.log("error",error)
    throw error;
}