import { useContext, useEffect, useRef, useState } from "react"
import { Modal } from "../../../Settings/Modal"
import { Btn } from "../../../Settings/Styleds/StyledComponents"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup";
import { Context } from "../../../Settings";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
export const Glavni_Text = () => {
    const date = new Date()
    const [modal, setModal] = useState(!true)
    const {user} = useContext(Context)
    const navigate = useNavigate()
    const mutation = useMutation(data => {
        axios({
            url: "http://localhost:1111/product",
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            data: {...data, user_id: user.id, avtor: `${user.name} ${user.lastname}`, date: `${date.toLocaleDateString()}-${date.getHours()}:${date.getMinutes()} Create-At it's product`}
        }).catch((error) => {
            return error
        }).then((response) => {
            if(response.status === 201){
                setModal(!modal)
                navigate("/Akkaunt/Corsines")
            }
        })
    })
    const initialValues = {
        name: "",
        disc: "",
        type: "default",
        image: "",
        price: "",
        ulcham: "ulcham",
        telnumber: ""
    }
    const validationSchema = Yup.object({
        name: Yup.string().required("Mahsulot nomi majburiy"),
        disc: Yup.string().min(5, "Min 5").max(30, "Max 30").required("Disc majburiy"),
        type: Yup.string().required("Kiym turini kiritish majburiy"),
        image: Yup.string().required("Rasm majburiy"),
        price: Yup.number().required("Narx majburiy"),
        telnumber: Yup.string().required("Raqam kiritish majburiy"),
        ulcham: Yup.string().required("Ulcham majburiy")
    })
    const handleSub = event => {
        mutation.mutate(event)
    }
    const getCategory = useCallback(async () => {
        const request = await axios.get("http://localhost:1111/category")
        const response = await request.data
        return response        
    }, [user.id])
    const query = useQuery("/category", getCategory)
    return(
        <>
            <div className="glavni_texts">
                <div className="glavni_text">
                    <div className="container_fluid">    
                        <h2 style={{fontFamily: "Bold"}}>Добро пожаловать в шоппнг !</h2>       
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia eos facilis consequatur quis minus architecto illo nemo nulla ipsum error. Incidunt sint blanditiis reprehenderit quisquam fugiat, pariatur quae vitae accusantium modi? Quis veritatis saepe aspernatur quo est quam atque culpa, ipsam sit consectetur cupiditate commodi provident recusandae ut? Fugit reiciendis ducimus cumque quas minus nihil, autem iste ipsam voluptas delectus.</p>
                        <Btn className="elon_btn_1" onClick={() => setModal(!modal) } variant="grey" style={{background: "#fff", marginTop: "1rem"}}>E'lon berish</Btn> 
                    </div>      
                </div>
            </div>  
            <Modal modal={modal} setModal={setModal} title={"E'lon joylash"}>
                
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSub}>
                    <Form>
                        <label htmlFor="name">
                            <Field placeholder="Mahsulot nomi" id="name" name="name"/>
                            <ErrorMessage className="error_text" component={"p"} name="name"/>
                        </label>
                        <label htmlFor="kiym_turi">
                            <Field id="kiyim turi" component="select" name="type">
                               {query?.isLoading && 
                                <option value="default" selected disabled>Tekshirilmoqda</option>
                               }
                               {query?.isError &&
                                <option value="default" selected disabled>Xatolik yuz berdi</option>
                               }
                               {query?.isSuccess && 
                               <>
                                {query?.data?.erkak === true && query?.data?.ayol !== true ? 
                                     <option value="erkak">Erkak</option> :query?.data?.ayol === true && query?.data?.erkak !== true?   
                                     <option value="ayol">Ayol</option> : query?.data?.erkak === true && query?.data?.ayol === true ? 
                                     <>
                                         <option selected disabled value="default">Kiym turi</option>
                                        <option value="erkak">Erkak</option>
                                        <option value="ayol">Ayol</option>
                                     </>: 
                                     <option value={"default"}>Xatolik</option>
                                 }
                               </>
                               }
                            </Field>
                            <ErrorMessage name="type"/>
                        </label>
                        <label htmlFor="ulcham">
                            <Field component="select" name="ulcham">
                                <option selected disabled value="ulcham">O'lcham</option>
                                <option value="xl">XL</option>
                                <option value="xxl">XXL</option>
                                <option value="xs">XS</option>
                                <option value="s">S</option>
                                <option value="m">M</option>
                                <option value="l">L</option>
                                <option value="3xl">3xl</option>
                            </Field>
                            <ErrorMessage name="ulcham"/>
                        </label>
                        <label htmlFor="image">
                            <Field placeholder="Rasm linki" name="image" type="url" id="image" />
                            <ErrorMessage className="error_text" component={"p"} name="image"/>
                        </label>
                        <label htmlFor="price">
                            <Field placeholder="Narxi" type="number" id="price" name="price"/>
                            <ErrorMessage className="error_text" component={"p"} name="price"/>
                        </label>
                        <label htmlFor="tel">
                            <Field id="tel" placeholder="Telefon raqam" component="input" type="number" name="telnumber"/>
                            <ErrorMessage className="error_text" component="p" name="telnumber"/>
                        </label>
                        <label htmlFor="disc">
                            <Field component="textarea" placeholder="Qisqacha ma'lumot" id="disc" name="disc"/>
                            <ErrorMessage className="error_text" component={"p"} name="disc"/>
                        </label>
                        <label htmlFor="submit">
                            <Btn type="submit" variant="yellow">Yuborish</Btn>
                        </label>
                    </Form>
                </Formik>
            </Modal>
        </>
    )
}