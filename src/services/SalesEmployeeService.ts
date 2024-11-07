import axios, { AxiosResponse } from "axios";
import { SalesEmployee } from "../models/SalesEmployee";
import { SalesEmployeeRequest } from "../models/SalesEmployeeRequest";


export const getSalesEmployee = async (): Promise<SalesEmployee[]> => {
    try{
        const response: AxiosResponse = await axios.get("http://localhost:8080/api/sales-employees");
        return response.data; 
    } catch (e){
        console.log(e);
        throw new Error('Failed to get Sales Employees');
    }

}

export const getSalesEmployeeById = async (id :string): Promise<SalesEmployee> =>{
    try{
        const response: AxiosResponse = await axios.get("http://localhost:8080/api/sales-employees/" + id
        );
        return response.data;
    } catch(e){
        console.log(e);
        throw new Error('Failed to get Sales Employee');
    }
}

export const createSalesEmployee = async (SalesEmployee: SalesEmployeeRequest): Promise<number> => {
    try{
        const response: AxiosResponse = await axios.post("http://localhost:8080/api/sales-employees", SalesEmployee);
        return response.data;
    }catch(e){
        console.log(e);
        throw new Error(e.response.data)

    }

}