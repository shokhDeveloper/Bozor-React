import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup"
import { Btn } from "../../../Settings/Styleds";
export const UpdatePosts = ({ title, body , id, avtor, user_id, modal, setModal}, getMyTovar) => {
    const date = new Date()
    const { errors, handleSubmit, getFieldProps } = useFormik({
    initialValues: {
      title: title,
      body: body,
    },
    onSubmit: async (event) => {
        const request = await axios({
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            } ,
            data :{
                ...event,
                avtor,
                user_id,
                date: `${date.toLocaleDateString()}-${date.getHours()}:${date.getMinutes()} Yangilandi`,
                status: "published"
            },
            url: `http://localhost:1111/posts/${id}`   
        }).catch(error => console.log(error))
        if(request.status === 200){
            setModal(!modal)
            getMyTovar()
            const response = await request.data
            return response
        }
    },
    validationSchema: Yup.object({
        title: Yup.string().required("Title majburiy"),
        body: Yup.string().required("Body majburiy")
    })
  });
  return (
    <form onSubmit={handleSubmit} >
      <label htmlFor="title">
        <p className={errors?.title? "error_text": null}><small>{errors?.title? errors?.title: "Title"}</small></p>
        <input type="text" id="title" {...getFieldProps("title")} />
      </label>
      <label htmlFor="body">
        <p className={errors?.body? "error_text": null}><small>{errors?.body? errors?.body: "Body"}</small></p>
        <input type="text" id="body" {...getFieldProps("body")} />
      </label>
    <Btn type="submit" variant="yellow">Yuborish</Btn>
    </form>
  );
};
