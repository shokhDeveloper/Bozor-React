import { Button, Checkbox, Col,  Input,  Row, Table, Typography } from "antd"
import { Btn } from "../../Settings/Styleds"
import * as Yup from "yup";
import { useQuery } from "react-query"
import axios from "axios"
const {Title} = Typography
export const Home = () => {
    const getCategory = async () => {
        const request = await axios.get(`http://localhost:1111/category`)
        const response = await request.data
        return [response]
    }
    const query = useQuery(`/category`, getCategory)
    const handleChange = async event => {
        let table = document.querySelector(".table")
        switch(event.target.id){
            case "erkak":{
                if(event.target.checked === true){
                    const request = await axios({
                        method: "PUT",
                        url: `http://localhost:1111/category`,
                        headers: {
                            "Content-Type": "application/json"
                        },
                        data:{
                            erkak: event.target.checked,
                            ayol: table.querySelector("#ayol").checked,
                            status: "published"
                        }
                        
                    }).catch(error => console.log(error))
                    const response = await request?.data
                    return response
                }else{
                    const request = await axios({
                        method: "PUT",
                        url: `http://localhost:1111/category`,
                        headers: {
                            "Content-Type": "application/json"
                        },
                        data:{
                            erkak: event.target.checked,
                            ayol: table.querySelector("#ayol").checked,
                            status: "published"
                        }
                        
                    }).catch(error => console.log(error))
                    const response = await request?.data
                    return response
                }
            }break;
            case "ayol":{
                if(event.target.checked){
                    const request = await axios({
                        method: "PUT",
                        url: `http://localhost:1111/category`,
                        headers: {
                            "Content-Type": "application/json"
                        },
                        data:{
                            erkak: table.querySelector("#erkak").checked,
                            ayol: event.target.checked,
                            status: "published"
                        }
                        
                    }).catch(error => console.log(error))
                    const response = await request?.data
                    return response
                }else{
                    const request = await axios({
                        method: "PUT",
                        url: `http://localhost:1111/category`,
                        headers: {
                            "Content-Type": "application/json"
                        },
                        data:{
                            erkak: event.target.checked,
                            ayol: table.querySelector("#ayol").checked,
                            status: "published"
                        }
                        
                    }).catch(error => console.log(error))
                    const response = await request?.data
                    return response
                }
            }break;
            default:{
                return false
            }
        }
    }
    const dataSource = query?.data?.map((item, index) => {
            return{
                check: "Sotuvga ruhsatlar",
                erkaklar: <>
                    <Checkbox onChange={handleChange} id="erkak" defaultChecked={item.erkak}/>
                </>,
                ayollar: <>
                    <Checkbox id="ayol" onChange={handleChange} defaultChecked={item.ayol}/>
                </>,
                id: index+1,
            }
        })
    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id"
        },
        {
            title: "Ruhsat",
            dataIndex: "check",
            key: "check"
        },
        {
            title: "Ayollar",
            dataIndex: "ayollar",
            key: "ayollar"
        },
        {
            title: "Erkaklar",
            dataIndex: "erkaklar",
            key: "erkaklar"
        }
    ]
    return(
        <div className="container_fluid">
            <Row style={{flexDirection: "column", margin: "1rem 0rem", width: "100%"}} justify={"center"}>
                <Title style={{textAlign: "center"}} level={2}>Category Qushish</Title>
                <Col style={{display: "flex", justifyContent: "flex-end", marginBottom: "1rem"}}>
                    <Button type="primary">Category qushish + </Button>
                </Col>
                <Col style={{width: "100%", textAlign: "center"}}>
                    {query?.isLoading &&
                        <Title level={4}>Yuklanmoqda</Title>
                    }
                    {query?.isError && (
                        <Title level={5}>Xatolik yuz berdi</Title>
                    )}
                    {query?.isSuccess ? (
                        <Table className="table"  size="middle" dataSource={dataSource} columns={columns} style={{textAlign: "center", width:"50%" , margin: "0 auto"}} pagination={false} />                   
                    ): (
                        <Table style={{textAlign: "center"}} className="table" pagination={false} dataSource={dataSource} columns={columns}/>
                    )}
                </Col>
            </Row>
        </div>
    )
}