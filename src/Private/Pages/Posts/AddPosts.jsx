import { useForm } from "react-hook-form";
import { Btn } from "../../../Settings/Styleds";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useMutation } from "react-query";
import axios from "axios";
import { useContext } from "react";
import { Context } from "../../../Settings";
export const AddPosts = ({modal, setModal, getMyTovar}) => {
    const date = new Date()
    const {user} = useContext(Context)
    const {name, lastname, id} = user
    const values = {
        title: "",
        body: ""
    }
    const validationSchema = Yup.object({
        title: Yup.string().required("Title kiritish majburiy"),
        body: Yup.string().required("Body kiritish majburiy")
    })
    const {register, watch, formState:{errors, isValid}, handleSubmit} = useForm({
        values,
        mode: "onChange",
        resolver: yupResolver(validationSchema)
    })
    const {isLoading, isSuccess, data, isError, mutate} = useMutation(data => {
        axios.post(`http://localhost:1111/posts`, {...data, date: `${date.toLocaleDateString()}-${date.getHours()}:${date.getMinutes()} Post qo'shildi`, avtor: `${name}  ${lastname}`, user_id: id }  ).then(response => {
            if(response.status === 201){
                setModal(!modal)
                getMyTovar()
            }
        }).catch( error => {
            return error
        })
    })
    const onSubmit = event => {
        mutate(event)
    }
    watch()
    return (
    <form style={{padding: "1rem"}} onSubmit={handleSubmit(onSubmit)}>
      <label id="title">
        <p className={errors?.title? "error_text": null} style={{paddingBottom: "0.3rem"}}>
          <small>{errors?.title? errors?.title?.message : "Title"}</small>
        </p>
        <input {...register("title")} type="text" id="title" name="title" />
      </label>
      <label htmlFor="body">
        <p className={errors?.body ? "error_text": null} style={{paddingBottom: "0.3rem"}}>
          <small>{errors?.body? errors?.body.message: "Body"}</small>
        </p>
        <input {...register("body")} type="text" name="body" />
      </label>
      <Btn disabled={!isValid} style={{marginTop:"1rem"}} variant="yellow">Yuborish</Btn>
    </form>
  );
};
