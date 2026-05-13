using BL.ClassesDTO;
using BL.FunctionBL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;

namespace API.Controllers
{
    [RoutePrefix("api/customer")]
    

    public class CustomerController:ApiController
    {
        CustomerBL cbl=new CustomerBL();

        [AcceptVerbs("Get", "Post", "Delete", "Put")]

        [Route("getallclients")]

        [HttpGet]

        public List<CustomersDTO> GetAllClients()
        {
            return cbl.GetAllClients();
        }
        [Route("insertclient")]

        [HttpPost]

        public IHttpActionResult InsertClient([FromBody] CustomersDTO client)
        {
            try
            {
                var result = cbl.InsertClient(client);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }
        [Route("updateclient")]

        [HttpPut]
        public int UpDateClient(CustomersDTO client)
        { return cbl.UpDateClient(client); }
        [Route("deleteclient")]

        [HttpDelete]

        public int DeleteClient(CustomersDTO client)
        {
            return cbl.DeleteClient(client);
        }
        [Route("getcustomersorderbyname")]


        [HttpGet]
        public List<CustomersDTO> GetCustomersOrderByName()
        {
            return cbl.GetCustomersOrderByName();
        }
        [Route("getcostomerbyid/{id}")]

        [HttpGet]
        public CustomersDTO GetCostomerByID(int id)
        {

            return cbl.Customerbyid(id);
        }
        [Route("GetThreeV")]

        [HttpGet]
        public List<CustomersDTO> GetThreeV()
        {
            return cbl.GetThreeV();
        }
        [Route("getfromcity/{city}")]

        [HttpGet]
        public List<CustomersDTO> GetFromCity(int city)
        {
            return cbl.GetFromCity(city);
        }
        [Route("getdeatailspayments/{id}")]

        [HttpGet]
        public PaymentDTO GetDeatailsPayments(int id)
        {
            return cbl.GetDeatailsPayments(id);
        }



    }
}