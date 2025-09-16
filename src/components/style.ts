import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    fontFamily: "Helvetica",
  },

  // Header
  header: {
    fontSize: 16,
    textAlign: "right",
    color: "#003366",
    fontWeight: "bold",
    marginBottom: 5,
  },

  date: {
    fontSize: 10,
    textAlign: "right",
    marginBottom: 20,
  },

  // Customer info
  tableInfo: {
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 3,
  },
  infoLabel: {
    width: 70,
  },
  infoValue: {
    flex: 1,
  },

  //ProductDetails
  productRow: {
    flexDirection: "row",
    marginBottom: 3,
    alignItems: "flex-start",
  },
  productDetailsTable: {
    marginBottom: 15,
  },
  labelCell: {
    width: 100,
    marginLeft: 5,
  },
  valueCell: {
    flex: 1,
  },

  //problem
  probPad: {
    padding: 5,
  },

  // Section titles
  sectionTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 10,
    padding: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  sectionTitleGray: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  //Borders
  noBorder: {
    borderTop: 0,
    borderBottom: 0,
    borderLeft: 0,
    borderRight: 0,
  },

  // Signature section
  signatureSection: {
    marginTop: 20,
    width: "100%",
  },
  signatureTitle: {
    backgroundColor: "#7a7a7a",
    color: "#fff",
    textAlign: "center",
    padding: 5,
    fontWeight: "bold",
    fontSize: 12,
  },
  signatureContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  signatureBox: {
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  signatureImage: {
    width: "100%",
    height: 50,
    objectFit: "contain",
  },
  signatureText: {
    marginTop: 5,
    textAlign: "center",
    fontSize: 10,
  },
  hr: {
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    marginVertical: 8,
    width: "100%",
  },
});
