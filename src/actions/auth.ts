"use server";

export async function registerAction(
    prevState: { sucess: boolean, error: string} | null,
    formData: FormData
){

    console.log("ldlgfdslgldslgds")
    const email = formData.get("email") as string;
    const name = formData.get("name") as string;
    const password = formData.get("password") as string;
    console.log(email)
    console.log(name)
    console.log(password)


    return { sucess: true, error: ""};
}