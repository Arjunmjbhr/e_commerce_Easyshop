import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export const downloadPDF = (
  salesOrders,
  totalOrder,
  totalProductSold,
  totalProductReturn,
  pendingOrder,
  totalSalesRevenue,
  totalAdminRevenue,
  couponUsedCount,
  couponUsedAmount
) => {
  const doc = new jsPDF({});

  // Add a title
  const title = "Easy Shop Sales Report";
  const pageWidth = doc.internal.pageSize.width;
  const titleWidth = doc.getTextWidth(title);
  const xOffset = (pageWidth - titleWidth) / 2;

  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(34, 139, 34);
  doc.text(title, xOffset, 20);

  // Add summary data
  const summaryData = [
    { label: "Total Orders:", value: `: ${totalOrder}` },
    { label: "Total Products Sold:", value: `: ${totalProductSold}` },
    { label: "Total Product Return:", value: `: ${totalProductReturn}` },
    { label: "Pending Orders:", value: `: ${pendingOrder}` },
    { label: "Total Sales Revenue:", value: `: ${totalSalesRevenue}` },
    { label: "Total Admin Revenue:", value: `: ${totalAdminRevenue}` },
    { label: "Coupon Used Count:", value: `: ${couponUsedCount}` },
    { label: "Coupon Used Amount:", value: `: ${couponUsedAmount}` },
  ];

  let yOffset = 30; // Starting Y position for the summary

  // Loop through summary data and add it to PDF
  summaryData.forEach((item, index) => {
    doc.setFontSize(12);

    const labelX = 14; // X position for the label (left-aligned)
    const valueX = 70;
    doc.setTextColor(0, 0, 0);
    doc.text(item.label, labelX, yOffset); // Draw the label
    doc.setTextColor(73, 89, 48);
    doc.text(item.value.toString(), valueX, yOffset); // Draw the value

    yOffset += 10; // Move to the next line
  });

  // Add a gap before starting the table
  yOffset += 10;

  // Add table for sales orders
  const tableData = salesOrders.map((order) => {
    const { _id, price, createdAt, couponAmount } = order;

    const ActualPrice =
      order?.products?.reduce(
        (amount, product) => amount + (product.price || 0),
        0
      ) || 0;
    const productsSoldPrice = order?.products?.reduce((amount, product) => {
      const { validOfferPercentage, discount, price } = product;
      const validOfferDiscount =
        validOfferPercentage > discount ? validOfferPercentage : discount;
      return amount + (price - (price * validOfferDiscount) / 100);
    }, 0);
    const orderDiscount = (productsSoldPrice / ActualPrice) * 100;
    const deliveryCharge = price - productsSoldPrice;

    return [
      _id,
      new Date(createdAt).toLocaleDateString(),
      `${ActualPrice}`,
      `${orderDiscount.toFixed(2)}%`,
      `${couponAmount.toFixed(2)}`,
      `${Math.floor(deliveryCharge).toString()}`,
      `${price}`,
    ];
  });

  // Add table to PDF using autoTable
  autoTable(doc, {
    startY: yOffset, // Start the table below the summary section
    head: [
      [
        "Order ID",
        "Date",
        "Amount (MRP)",
        "Discount (%)",
        "Coupon Amount",
        "Delivery Charge",
        "Net Amount",
      ],
    ],
    body: tableData, // Make sure the table data is in the correct format
  });

  // Save the PDF
  doc.save("sales_report.pdf");
};
