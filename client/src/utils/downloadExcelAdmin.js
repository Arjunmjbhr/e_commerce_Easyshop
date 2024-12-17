import * as XLSX from "xlsx";

export const downloadEXCEL = (
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
  // Create a new workbook
  const wb = XLSX.utils.book_new();

  // Create worksheet data for the summary section (heading + labels/values)
  const summaryData = [
    { label: "Total Orders:", value: totalOrder },
    { label: "Total Products Sold:", value: totalProductSold },
    { label: "Total Product Returns:", value: totalProductReturn },
    { label: "Pending Orders:", value: pendingOrder },
    { label: "Total Sales Revenue:", value: `₹${totalSalesRevenue}` },
    { label: "Total Admin Revenue:", value: `₹${totalAdminRevenue}` },
    { label: "Coupon Used Count:", value: couponUsedCount },
    { label: "Coupon Used Amount:", value: `₹${couponUsedAmount}` },
  ];

  const summaryHeaders = ["Label", "Value"];
  const summaryRows = summaryData.map((item) => [item.label, item.value]);

  // Create worksheet for the summary section
  const summaryWs = XLSX.utils.aoa_to_sheet([summaryHeaders, ...summaryRows]);

  // Add the summary sheet to the workbook
  XLSX.utils.book_append_sheet(wb, summaryWs, "Summary");

  // Create worksheet for the sales orders table
  const tableHeaders = [
    "Order ID",
    "Date",
    "Amount (MRP)",
    "Discount (%)",
    "Coupon Amount",
    "Delivery Charge",
    "Net Amount",
  ];

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
    const deliveryCharge = price - (productsSoldPrice - couponAmount);

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

  // Create worksheet for the sales orders table
  const tableWs = XLSX.utils.aoa_to_sheet([tableHeaders, ...tableData]);

  // Add the table sheet to the workbook
  XLSX.utils.book_append_sheet(wb, tableWs, "Sales Orders");

  // Create and download the Excel file
  XLSX.writeFile(wb, "sales_report.xlsx");
};
