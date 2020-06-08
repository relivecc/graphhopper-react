import ReactDOM from "react-dom";

/**
 * This portal contains the per-layer settings on the left-hand side of the screen
 */
export const SettingsPortal: React.FunctionComponent<{ domNode: Element }> = (props) => {

    // React does *not* create a new div. It renders the children into `domNode`.
    // `domNode` is any valid DOM node, regardless of its location in the DOM.
    return ReactDOM.createPortal(
        props.children,
        props.domNode
    );
}