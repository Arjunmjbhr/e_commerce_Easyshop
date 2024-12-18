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
    const { _id, price, createdAt, couponAmount, shippingFee } = order;

    const ActualPrice = order?.products?.reduce((amount, product) => {
      if (product.returnStatus !== "accepted") {
        const { price, quantity } = product;
        const totalPrice = price * quantity;
        return amount + totalPrice;
      }
      return amount;
    }, 0);
    const productsSoldPrice = order?.products?.reduce((amount, product) => {
      const { validOfferPercentage, discount, price, quantity } = product;

      if (product.returnStatus !== "accepted") {
        const validOffreDiscount =
          validOfferPercentage > discount ? validOfferPercentage : discount;
        const totalPrice =
          (price - (price * validOffreDiscount) / 100) * quantity;

        return amount + totalPrice;
      }
      return amount;
    }, 0);
    const orderDiscount = (productsSoldPrice / ActualPrice) * 100;
    const conditionedOrderDiscount = orderDiscount
      ? orderDiscount.toFixed(2)
      : "Nil";
    const conditinedCoupon = couponAmount ? couponAmount : "Nil";

    return [
      _id,
      new Date(createdAt).toLocaleDateString(),
      `${ActualPrice}`,
      `${conditionedOrderDiscount}%`,
      `${conditinedCoupon}`,
      `${Math.floor(shippingFee).toString()}`,
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
