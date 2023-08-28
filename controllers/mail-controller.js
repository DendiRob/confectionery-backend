const nodemailer = require('nodemailer');


const sendOrder =  (req,res) => {
     

    const {buyersName,buyersNumber,buyersComment, order, orderPrice} = req.body;    

    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });
    
    function mailer(message) {
    
        transporter.sendMail(message, (err,info) => {
            if(err) console.log(err)
            console.log("email sent:", info)
        })
    }  
    
    const generateEmailHTML = () => {
        let html = `
        <table 
        style="
        border: 1px solid #000000;
        width: 600px;
        margin: 0 auto;
        " >
          <caption style="
          font-family: 'Franklin Gothic Medium', sans-serif;
          font-size: 20px;
          margin-bottom: 10px;
          ">Новый заказ от ${buyersName}, номер телефона: ${buyersNumber}</caption>
          <tr>
                <th style="
                border-bottom: 1px solid #000;      
                padding: 0;
                font-family: sans-serif;
                font-size: 13px;
                text-align: start;
                ">Название товара</th>
                <th style="
                border-bottom: 1px solid #000;    
                padding: 0;
                font-family: sans-serif;
                font-size: 13px;
                text-align: start;
                ">Количество товара</th>
                <th style="
                border-bottom: 1px solid #000;      
                padding: 0;
                font-family: sans-serif;
                font-size: 13px;
                text-align: start;
                ">Номер товара</th>
                <th style="border-bottom: 1px solid #000; font-family: sans-serif; font-size: 13px; text-align: start;">Цена</th>
          </tr>
        `;
        order.forEach((item) => {
          html += `
            <tr>
                <td style="
                font-family: sans-serif;
                font-size: 15px;
                ">${item.title}</td>
                <td style="
                font-family: sans-serif;
                font-size: 15px;
                ">${item.quantity}</td>
                <td style="
                font-family: sans-serif;
                font-size: 15px;
                ">${item.productID}</td>
                <td style="
                font-family: sans-serif;
                font-size: 15px;
                ">${item.totalPrice}</td>
            </tr>
          `;
        });
        
        html += `
            </table>
            <div style=" font-family: sans-serif;font-size: 21px; width: 600px;text-align: end; margin: 0 auto; margin-bottom: 15px;border-bottom: 1px solid black;">Итог:${orderPrice} руб</div>  
            <div class="comment" style="
            width:  600px;
            font-family: sans-serif;
            margin: 0 auto;
            ">
            <div style="margin-bottom: 10px; text-align: center; font-weight: 700;">Комментарий к заказу</div>
            <div style="border: 1px solid #5333c5; padding: 10px; border-radius: 5px;">${buyersComment}</div>
            </div>
        `;
        return html;
      };
   
    const html = generateEmailHTML()

    const message = {
            from: process.env.EMAIL_USER,
            to: 'dendiroblek@gmail.com',
            subject: `Новый заказ. Дата ${new Date()}`,
            text: `${new Date()}`,
            html: html
    }

    mailer(message)
    res.send('the mail is sent')


};

module.exports = {
    sendOrder,
}