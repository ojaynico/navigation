import * as React from 'react';
import withStateNavigator from './withStateNavigator';
import withSharedElementRegistry from './withSharedElementRegistry';
import { SharedElementProps } from './Props';

class SharedElement extends React.Component<SharedElementProps, any> {
    private ref: React.RefObject<HTMLElement>;
    constructor(props) {
        super(props);
        this.ref = React.createRef(); 
    }
    componentDidMount() {
        this.register();
    }
    componentDidUpdate(prevProps) {
        var {stateNavigator, sharedElementRegistry} = this.props;
        var scene = stateNavigator.stateContext.crumbs.length;
        sharedElementRegistry.unregisterSharedElement(scene, prevProps.name);
        this.register();
    }
    componentWillUnmount() {
        var {stateNavigator, sharedElementRegistry} = this.props;
        var scene = stateNavigator.stateContext.crumbs.length;
        sharedElementRegistry.unregisterSharedElement(scene, this.props.name);
    }
    register() {
        if (!this.ref.current) return;
        var {unshare, name, data, stateNavigator, sharedElementRegistry} = this.props;
        var scene = stateNavigator.stateContext.crumbs.length;
        if (!unshare)
            sharedElementRegistry.registerSharedElement(scene, name, this.ref.current, data);
        else
            sharedElementRegistry.unregisterSharedElement(scene, name, this.ref.current);
    }
    render() {
        return React.cloneElement(this.props.children, {ref: this.ref});
    }
}

export default withStateNavigator(withSharedElementRegistry(SharedElement));