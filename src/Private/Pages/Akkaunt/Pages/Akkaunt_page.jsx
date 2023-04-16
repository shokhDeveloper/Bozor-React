import { useCallback, useContext, useEffect, useState } from "react";
import { Context } from "../../../../Settings";
import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { Btn } from "../../../../Settings/Styleds";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup"
import { useNavigate } from "react-router-dom";
export const Akkaunt_page = () => {
    const { user, setUser, setToken } = useContext(Context);
    const [read, setRead] = useState(!false)
    const navigate = useNavigate()
    const validationSchema = Yup.object({
      name: Yup.string().required("Ism kiritish majburiy"),
      lastname: Yup.string().required("Email kiritish majburiy"),
      email: Yup.string().email("Email xato").required("Email kiritish majburiy"),
      password: Yup.string().min(3, "Min 3").max(12, "Max 12").required("Password majburiy")        
  })
  const getUser = useCallback(async () => {
    const request = await axios.get(`http://localhost:1111/users/${user.id}`);
    const response = await request.data;
    return [response];
  }, [user.id]);
  const { isLoading, isError, isSuccess, data } = useQuery(
    `/users/${user.id}`,
    getUser
  );
  const {register, watch, formState:{isValid, errors}, handleSubmit } = useForm({
    values:{
        name: data? data[0].name : null,
        lastname: data? data[0].lastname : null,
        email: data? data[0].email : null,
        password: "Password"     
    },
    mode: "onChange",
    resolver: yupResolver(validationSchema)
  })
  const mutation = useMutation( data => {
    axios.put(`http://localhost:1111/users/${user.id}`, data)
  })
  const onSubmit = event => {
    console.log(event)
    mutation.mutate({...event})
  }
  const handleDelete = (id ) => {
      fetch(`http://localhost:1111/users/${id}`, {
        method: "DELETE"
      }).then((response) => {
        if(response.status === 200){
          window.localStorage.clear()
          navigate("/")
          setToken(null)
          setUser(null)
          return response.json()
        }
      }).then((data) => {
          return data
      })
  }
  watch()
  useEffect(() => {
    console.log(isValid, read)
  },[isValid, read ])
  return (
    <div className="akkaunt_page">
      <h1>Profil ma'lumotlari</h1>
      {isLoading && (
        <h1>Yuklanmoqda</h1>
      )}
      {isSuccess &&
        data?.map((item) => {
          return (
            <div className="akkaunt_formas" key={item.id}>
                <form id="form" onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="name">
                    <p style={{color: errors?.name? "crimson": "black"}}><small>{errors?.name? errors?.name?.message: "Ism"}</small></p>
                    <input style={{outline: errors?.name? "1px solid crimson": "1px solid transparent"}} {...register("name")} readOnly={read} placeholder="Ismingizni kiriting" name="name" id="name" autoFocus={read !== true? true: false}  type="text" />
                </label>
                <label htmlFor="lastname">
                    <p style={{color: errors?.lastname? "crimson": "black"}}><small>{errors?.lastname? errors?.lastname?.message: "Familya"}</small></p>
                    <input style={{outline: errors?.lastname? "1px solid crimson": "1px solid transparent" }} placeholder="Familyangizni kiriting" {...register("lastname")} name="lastname" readOnly={read}  autoFocus={read !== true? true: false}  id="lastname" type="text" />
                </label>
                <label htmlFor="email">
                    <p style={{color: errors?.email? "crimson": "black"}}><small>{errors?.email? errors.email.message : "Email"}</small></p>
                    <input style={{outline: errors?.email? "1px solid crimson": "1px solid transparent"}} placeholder="Emailingizni kiriting" {...register("email")} readOnly={read} name="email" autoFocus={read !== true? true: false} id="email"  type="text" />
                </label>
                <label htmlFor="password">
                    <p style={{color: errors?.password? "crimson": "black"}}><small>{errors?.password? errors.password.message : "Parol"}</small></p>
                    <input style={{outline: errors?.password? "1px solid crimson": "1px solid transparent"}} {...register("password")}  name="password" readOnly={read} autoFocus={read !== true? true: false} id="email"  type="text" />
                </label>
                </form>
                <div className="akkaunt_page_btn_div">
                <Btn disabled={isValid === true && read === false? false: true} style={{fontSize: "18px"}} variant="yellow" type="submit" form="form">Yuborish</Btn>
                <button onClick={() => setRead(!read)}>{read === true? "Edit": "Tugatish"}</button>
                </div>
                <div className="chiqish" style={{textAlign: "center"}}>
              <Btn onClick={ () =>  handleDelete(item.id) } style={{marginTop: "1rem"}} variant="grey">Akk o'chirish </Btn>
                </div>
            </div>
            
          );
        })}
        {isError && (
            <h2>Serverdan ma'lumot olishda hatolik yuz berdi</h2>
        )}
    </div>
  );
};
