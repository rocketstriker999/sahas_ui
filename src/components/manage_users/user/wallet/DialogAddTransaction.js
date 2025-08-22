import { Dialog } from "primereact/dialog";
import { useCallback, useState } from "react";
import NoContent from "../../../common/NoContent";
import Loading from "../../../common/Loading";
import Detail from "../../../common/Detail";
import { Button } from "primereact/button";
import { useAppContext } from "../../../../providers/ProviderAppContainer";
import { InputText } from "primereact/inputtext";
import { getReadableDate } from "../../../../utils";

export default function DialogAddTransaction({ addingTransaction, setAddingTransactions }) {
    return <Dialog header={"Add New Transaction"} visible={addingTransaction} className="w-11"></Dialog>;
}
