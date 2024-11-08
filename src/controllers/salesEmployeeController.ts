import { promises } from 'dns';
import express from 'express';
import { getSalesEmployeeById, getSalesEmployee, createSalesEmployee } from '../services/SalesEmployeeService';

export const getAllSalesEmployees = async(req:express.Request, res:express.Response): Promise<void> => {
    res.render('salesEmployeeList.html', {SalesEmployee : await getSalesEmployee()});
}

export const getSingleSalesEmployee = async(req: express.Request, res: express.Response): Promise<void> =>{
    var lol = await getSalesEmployeeById(req.params.id);
    res.render('salesEmployeeDetail.html',{SalesEmployee:await getSalesEmployeeById(req.params.id)});
}

export const getSalesEmployeeForm = async (req: express.Request, res: express.Response): Promise<void> =>{
    res.render('salesEmployeeForm.html')
}

export const postSalesEmployeeForm = async (req: express.Request, res:express.Response): Promise<void> =>{
    try{
        const id = await createSalesEmployee(req.body);
        res.redirect('/sales_employee/' + id);
    }
    catch(e){
        res.locals.errormessage = e.message;
        res.render('salesEmployeeForm.html',req.body);
    }
}
