import { Document, Page, Text, View, Image } from "@react-pdf/renderer";
import { styles } from "./style";
import { FormData } from "@/types";
import { Table, TD, TH, TR } from "@ag-media/react-pdf-table";
import { formatDateToIndonesian } from "@/utils/dateFormatter";

interface Props {
  data: FormData;
  supplierSignature?: string;
  customerSignature?: string;
}

const ServiceReportDocument: React.FC<Props> = ({ data }) => {
  const components = data.components
    ? data.components.split("\n").filter((c) => c.trim() !== "")
    : [];
  const problems = data.problem
    ? data.problem.split("\n").filter((c) => c.trim() !== "")
    : [];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <Text style={styles.header}>REPORT SERVICE</Text>
        <View style={styles.hr} />
        <Text style={styles.date}>{formatDateToIndonesian(data.date)}</Text>

        {/* Customer Info */}
        <View style={styles.tableInfo}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Kepada</Text>
            <Text style={styles.infoValue}>: {data.to}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Alamat</Text>
            <Text style={styles.infoValue}>: {data.address}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Telephone</Text>
            <Text style={styles.infoValue}>: {data.phone}</Text>
          </View>
        </View>

        {/* Product Details */}
        <Table style={{ marginBottom: 20 }}>
          <TH style={{ backgroundColor: "#003366" }}>
            <TD style={[{ border: "1px" }, styles.sectionTitle]}>
              <Text>Product Details</Text>
            </TD>
          </TH>
          <View style={styles.infoRow}>
            <Text style={styles.labelCell}>Part/Driver Name</Text>
            <Text style={styles.infoValue}>: {data.part}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.labelCell}>Quantity</Text>
            <Text style={styles.infoValue}>: {data.qty}</Text>
          </View>
        </Table>

        {/* Problem */}
        <Table style={{ border: "1px", marginBottom: 20 }}>
          <TH style={{ backgroundColor: "#7a7a7a" }}>
            <TD style={[styles.sectionTitleGray, styles.probPad]}>
              <Text>Problem</Text>
            </TD>
          </TH>
          {problems.map((item, index) => (
            <TR key={index}>
              <TD style={styles.probPad}>
                <Text>{item}</Text>
              </TD>
            </TR>
          ))}
        </Table>

        {/* Part Component NG */}
        <Table style={{ border: "1px", marginBottom: 20 }}>
          <TH style={{ backgroundColor: "#7a7a7a" }}>
            <TD style={[styles.sectionTitleGray, styles.probPad]}>
              <Text>PART Component NG</Text>
            </TD>
          </TH>
          {components.map((component, index) => (
            <TR key={index}>
              <TD style={styles.probPad}>
                <Text>{component}</Text>
              </TD>
            </TR>
          ))}
        </Table>

        {/* Test / Trial */}
        <Table style={{ border: "1px", marginBottom: 20 }}>
          <TH style={{ backgroundColor: "#7a7a7a" }}>
            <TD style={[styles.sectionTitleGray, styles.probPad]}>
              <Text>Test / Trial</Text>
            </TD>
          </TH>
          <TR>
            <TD style={styles.probPad}>
              <Text>{data.trial || ""}</Text>
            </TD>
          </TR>
        </Table>

        {/* Signature */}

        <Table style={{ border: "1px", marginBottom: 20 }}>
          {/* Header */}
          <TH style={{ backgroundColor: "#7a7a7a" }}>
            <TD style={[styles.sectionTitleGray, styles.probPad]}>
              <Text>Signature</Text>
            </TD>
          </TH>

          <TR>
            {/* Supplier */}
            <TD
              style={[
                styles.probPad,
                { height: 100, width: 200 },
                styles.signatureBox,
              ]}
            >
              {data.supplierSignature && (
                <Image
                  src={Buffer.from(
                    data.supplierSignature.split(",")[1],
                    "base64"
                  )}
                  style={{ width: 100, height: 90 }}
                />
              )}
            </TD>
            {/* Customer */}
            <TD
              style={[
                styles.probPad,
                { height: 100, width: 200 },
                styles.signatureBox,
              ]}
            >
              {data.customerSignature && (
                <Image
                  src={Buffer.from(
                    data.customerSignature.split(",")[1],
                    "base64"
                  )}
                  style={{ width: 100, height: 90 }}
                />
              )}
            </TD>
          </TR>
          <TR>
            <TD style={styles.probPad}>
              <Text>Supplier Name: {data.supplier}</Text>
            </TD>
            <TD style={styles.probPad}>
              <Text>Customer Name: {data.customer}</Text>
            </TD>
          </TR>
        </Table>
      </Page>
    </Document>
  );
};

export default ServiceReportDocument;
