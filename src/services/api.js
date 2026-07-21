export async function processCheque(file){

    const formData = new FormData();

    formData.append("file",file);

    const response = await fetch(

        "http://localhost:5000/api/process-cheque",

        {

            method:"POST",

            body:formData

        }

    );

    return await response.json();

}