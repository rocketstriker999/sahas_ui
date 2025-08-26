import Loading from "./Loading";

export default function ProgressiveControl({ loading, control }) {
    return loading ? <Loading /> : control;
}
