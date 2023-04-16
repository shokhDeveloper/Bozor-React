import RemoveRedEye from "@mui/icons-material/RemoveRedEye"
import { useContext, useState } from "react"
import { Btn } from "../../Settings/Styleds/StyledComponents"
import {useForm} from "react-hook-form"
import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup"
import { useMutation } from "react-query";
import {Context} from "../../Settings"
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const Login = () => {
    const [type, setType] = useState(!true)
    const date = new Date()
    const {setToken, setUser} = useContext(Context)
    const navigate = useNavigate()
    const query = useMutation(data => {
        axios.post("http://localhost:1111/login", data).then((response) => {
           if(response.status === 200){
                const {accessToken, user} = response.data
                setToken(accessToken)
                setUser(user)
                navigate("/")
            }
        })
    })
    const validationSchema = Yup.object({
        email: Yup.string().email("Email xato").required("Email majburiy"),
        password: Yup.string().min(3, "Min 3").max(12, "Max 12").required("Parol majburiy")
    })
    const {register, watch, formState:{errors, isValid}, handleSubmit } = useForm(
        {
            values: {
                email: "",
                password: ""
            },
            mode: "onChange",
            resolver: yupResolver(validationSchema)
        }
    )
    const handleClick = event => {
        setType(!type)
    }
    const onSubmit = event => {
        query.mutate({...event, date: `${date.toLocaleDateString()}-${date.getHours()}:${date.getMinutes()} Login-At in user`})
    }
    watch()
    if(query?.isLoading) return console.log("Yuborilmoqda")
    if(query.isError) return console.log("Xatolik")
    return(
        <div className="public_login">
        <div className="container_fluid">
                <div className="public_login_align">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <h1>Login</h1>
                        <label htmlFor="email">
                            <p style={{color: errors?.email? "crimson": "black"}}><small>{errors?.email? errors.email.message: "Email kiriting"}</small></p>
                            <input style={{outline: errors?.email? "2px solid crimson": "2px solid transparent" }} {...register("email")} placeholder="Email yozing" type="email" id="email" />
                        </label>
                        <p style={{color: errors?.password? "crimson": "#000"}}><small>{errors?.password? errors.password.message: "Parol kiriting"}</small></p>
                           
                        <label htmlFor="password" className="password_label" style={{background: "#fff", display: "flex", alignItems: "center", outline: errors?.password? "2px solid crimson": "2px solid transparent"}}>
                            <input  {...register("password")} placeholder="Password yozing" type={type === true? "text": "password"} id="password" />
                            <RemoveRedEye onClick={handleClick}/>       
                        </label>
                        <label htmlFor="submit">
                        <Btn variant="yellow" type="submit">Login</Btn>
                        </label>
                    </form>
                </div>
            </div>
        </div>
    )
}