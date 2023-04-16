import RemoveRedEye from "@mui/icons-material/RemoveRedEye"
import { useFormik } from "formik"
import { useContext, useState } from "react"
import {Btn} from "../../Settings/Styleds"
import * as Yup from "yup";
import { useMutation } from "react-query";
import {Context} from "../../Settings"
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const Register = () => {
    const {setToken, setUser} = useContext(Context)
    const [type, setType] = useState(!true)
    const navigate = useNavigate()
    const date = new Date()
    const mutation = useMutation(data => {
        axios.post("http://localhost:1111/register", data).then((response) => {
            if(response){
                const {accessToken, user} = response.data
                if(accessToken !== null || accessToken !== undefined){
                    setToken(accessToken)
                    setUser(user)
                    navigate("/")
                }
            }
        }).catch((error) => {
            return error
        })
    })
    const formik = useFormik({
        initialValues: {
            name: "",
            lastname: "",
            email: "",
            password: ""
        },
        onSubmit(event){
            mutation.mutate({...event, date: `${date.toLocaleDateString()}-${date.getHours()}-${date.getMinutes()} Register At`})
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Ism kiritish majburiy"),
            lastname: Yup.string().required("Familya kiritish majburiy"),
            email: Yup.string().email("Email yozilish xato").required("Email kiritish majburiy"),
            password: Yup.string().min(3, "Min 3").max(12, "Max 12").required("Parol majburiy")
        })
    })
    return(
        <div className="register">
            <div className="container_fluid">
                <div className="register_align">
                    <h1>Ruyhattan o'ting</h1>
                    <form onSubmit={formik.handleSubmit}>
                        <label htmlFor="name">
                            <p style={{color: formik?.errors?.name? "crimson": "#000"}}><small>{formik?.errors?.name? formik.errors?.name : "Ism kiriting"}</small></p>
                            <input style={{outline: formik?.errors?.name? "2px solid crimson": "2px solid transparent"}} {...formik.getFieldProps("name")} placeholder="Ism" type="text" id="name"  />
                        </label>
                        <label htmlFor="lastname">
                            <p style={{color: formik?.errors?.lastname? "crimson": "#000"}}><small>{formik?.errors?.lastname? formik?.errors?.lastname: "Familya kiriting"    }</small></p>
                            <input style={{outline: formik?.errors?.lastname? "2px solid crimson": "2px solid transparent"}}  {...formik.getFieldProps("lastname")} type="text" placeholder="Familya" id="lastname" />
                        </label>
                        <label htmlFor="email">
                            <p style={{color: formik?.errors?.email? "crimson": "#000"}}><small>{formik?.errors?.email? formik?.errors?.email:"Email kiriting" }</small></p>
                            <input style={{outline: formik?.errors?.email? "2px solid crimson": "2px solid transparent"}} {...formik.getFieldProps("email")} type="email" placeholder="Email" id="email" />
                        </label>
                        <p style={{display: "block", color: formik?.errors?.password? "crimson": "#000"}}> <small>{formik?.errors?.password? formik?.errors?.password: "Parol kiriting"}</small> </p>
                        <label htmlFor="password" className="password_label" style={{background: "#fff", display: "flex", alignItems: "center", outline: formik?.errors?.password? "2px solid crimson": "2px solid transparent"}}>
                            <input style={{background: "#fff"}} {...formik.getFieldProps("password")} type={type !== true? "password": "text" } id="password" placeholder="Parol" />
                            <RemoveRedEye onClick={() => setType(!type)}/>        
                        </label>
                        <label htmlFor="submit">
                        <Btn variant="yellow" id="submit">Register</Btn>                       
                        </label>
                    </form>
                </div>
            </div>
        </div>
    )
}