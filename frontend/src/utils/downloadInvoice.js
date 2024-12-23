import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export const downloadPDF = (myOrder) => {
  const {
    price,
    payment_status,
    shippingFee,
    date,
    couponAmount,
    razorpay_payment_id,
    shippingInfo,
    _id,
    updatedAt,
  } = myOrder;

  const doc = new jsPDF();
  //
  doc.setFontSize(9);
  doc.setTextColor(108, 112, 109);
  doc.text(`invoice generated on ${new Date()}`, 20, 10);
  // Add a title
  const title = "EasyShop";
  const pageWidth = doc.internal.pageSize.width;
  const titleWidth = doc.getTextWidth(title);
  const xOffset = (pageWidth - titleWidth) / 2;

  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(34, 139, 34);
  doc.text(title, xOffset, 30);
  const subTitle = "Tax Invoice/Bill of Supply/Cash Memo";
  doc.setTextColor(34, 139, 34);
  doc.setFontSize(14);
  doc.text(subTitle, 70, 37);

  // invoice number
  let yOffset = 55;
  doc.setFontSize(10);
  doc.setTextColor(108, 112, 109);
  doc.text(`invoice No:${_id}`, 120, yOffset);
  yOffset += 5;
  doc.text(
    `invoice Date:${new Date(updatedAt).toLocaleString()}`,
    120,
    yOffset
  );

  // Add shipping information and invoice
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  //   doc.setTextColor(0, 0, 0);
  doc.text("Delivered To:", 10, yOffset);

  yOffset += 5;
  doc.setFontSize(10);
  doc.text(`Name: ${shippingInfo.name}`, 30, yOffset);
  yOffset += 5;
  doc.text(
    `Address: ${shippingInfo.address}, ${shippingInfo.area}`,
    30,
    yOffset
  );
  yOffset += 5;
  doc.text(`District: ${shippingInfo.district}`, 30, yOffset);
  yOffset += 5;
  doc.text(
    `City: ${shippingInfo.city}, Post: ${shippingInfo.post}`,
    30,
    yOffset
  );

  //   adding payment details
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  //   doc.setTextColor(0, 0, 0);
  yOffset += 10;
  doc.text("Payment Details:", 10, yOffset);
  doc.setFontSize(10);
  yOffset += 5;
  doc.text(
    `Payment Mode: ${payment_status === "cod" ? "cod" : "Online"}`,
    30,
    yOffset
  );
  yOffset += 5;
  if (payment_status === "paid") {
    doc.text(`Payment Id: ${razorpay_payment_id}`, 30, yOffset);
    yOffset += 5;
  }
  doc.text(`Product Price: ${price - shippingFee + couponAmount}`, 30, yOffset);
  yOffset += 5;
  doc.text(`shipping Fee:+ ${shippingFee}`, 30, yOffset);
  yOffset += 5;
  if (couponAmount) {
    doc.text(`Coupon :- ${couponAmount}`, 30, yOffset);
    yOffset += 5;
  }
  doc.text(`Amount paid: ${price}`, 30, yOffset);
  //   order details
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(108, 112, 109);

  yOffset += 10;
  doc.text("Order Details:", 10, yOffset);
  //   doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  yOffset += 5;
  doc.text(`Order Id: ${_id}`, 30, yOffset);
  yOffset += 5;
  doc.text(`Order Date: ${date}`, 30, yOffset);

  yOffset += 10; // Add extra spacing before the table

  // Prepare table data
  let allSumMrp = 0;
  let allProductSum = 0;
  let totalQuantity = 0;
  const tableData = myOrder.products.map((product) => {
    const { validOfferPercentage, discount, price, quantity, returnStatus } =
      product;
    const offerDiscount = Math.max(validOfferPercentage || 0, discount || 0);
    const netProductPrice =
      (price - Math.floor((offerDiscount * price) / 100)) * quantity;

    allSumMrp += price * quantity;
    allProductSum += netProductPrice;
    totalQuantity += quantity;

    return [
      `${product.name} ${
        returnStatus === "accepted" ? `(Product Returned)` : ""
      }`,
      product.price.toFixed(2),
      offerDiscount || "-",
      product.quantity,
      netProductPrice.toFixed(2),
    ];
  });

  // Add table to PDF using autoTable
  autoTable(doc, {
    startY: yOffset,
    head: [["Name", "MRP", "Discount (%)", "Quantity", "Net Amount"]],
    body: tableData,
    foot: [
      [
        "Total",
        allSumMrp.toFixed(2),
        ((1 - allProductSum / allSumMrp) * 100).toFixed(2),
        totalQuantity,
        allProductSum.toFixed(2),
      ],
    ],
  });

  // Save the PDF
  doc.save("invoice.pdf");
};
