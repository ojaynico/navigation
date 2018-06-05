/**
 * Type definitions for Navigation React v3.1.0
 * (c) Graham Mendick - http://grahammendick.github.io/navigation/
 * License: Apache-2.0
 */

import { State, StateNavigator, StateContext } from 'navigation';
import { Component, Context, AnchorHTMLAttributes, DetailedHTMLProps, MouseEvent } from 'react';

/**
 * Makes all navigation immutable and deferrable
 */
export class AsyncStateNavigator extends StateNavigator {
    /**
     * Navigates to a State
     * @param stateKey The key of a State
     * @param navigationData The NavigationData to be passed to the next
     * State and stored in the StateContext
     * @param historyAction A value determining the effect on browser history
     * @param defer A value indicating whether to defer the React update
     * @throws state does not match the key of a State or there is
     * NavigationData that cannot be converted to a String
     * @throws A mandatory route parameter has not been supplied a value
     */
    navigate(stateKey: string, navigationData?: any, historyAction?: 'add' | 'replace' | 'none', defer?: boolean): void;
    /**
     * Navigates back along the crumb trail
     * @param distance Starting at 1, the number of Crumb steps to go back
     * @param historyAction A value determining the effect on browser history
     * @param defer A value indicating whether to defer the React update
     * @throws canNavigateBack returns false for this distance
     * @throws A mandatory route parameter has not been supplied a value
     */
    navigateBack(distance: number, historyAction?: 'add' | 'replace' | 'none', defer?: boolean): void;
    /**
     * Navigates to the current State
     * @param navigationData The NavigationData to be passed to the current
     * State and stored in the StateContext
     * @param historyAction A value determining the effect on browser history
     * @param defer A value indicating whether to defer the React update
     * @throws There is NavigationData that cannot be converted to a String
     * @throws A mandatory route parameter has not been supplied a value
     */
    refresh(navigationData?: any, historyAction?: 'add' | 'replace' | 'none', defer?: boolean): void;
    /**
     * Navigates to the url
     * @param url The target location
     * @param historyAction A value determining the effect on browser history
     * @param history A value indicating whether browser history was used
     * @param suspendNavigation Called before the navigation completes
     * @param defer A value indicating whether to defer the React update
     */
    navigateLink(url: string, historyAction?: 'add' | 'replace' | 'none', history?: boolean,
        suspendNavigation?: (stateContext: StateContext, resumeNavigation: () => void) => void, defer?: boolean);
}

/**
 * Navigation event data
 */
export interface NavigationEvent {
    /**
     * The last State displayed before the current State
     */
    oldState: State;
    /**
     * The current State
     */
    state: State;
    /**
     * The NavigationData for the current State
     */
    data: any;
    /**
     * The current asynchronous data
     */
    asyncData: any;
    /**
     * The next State to be displayed when deferred navigation completes
     */
    nextState: State;
    /**
     * The NavigationData for the next State
     */
    nextData: any;
    /**
     * State navigator for the current context
     */
    stateNavigator: AsyncStateNavigator;
}

/**
 * The context for providers and consumers of navigation event data
 */
export var NavigationContext: Context<NavigationEvent>;

/**
 * Provides the navigation event data
 */
export class NavigationHandler extends Component<{ stateNavigator: StateNavigator }> { }

/**
 * Defines the Link Props contract
 */
export interface LinkProps extends DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> {
    /**
     * Determines the effect on browser history
     */
    historyAction?: 'add' | 'replace' | 'none';
    /**
     * Handles Link click events
     */
    navigating?(e: MouseEvent<HTMLAnchorElement>, link: string): boolean;
    /**
     * Indicates whether to defer the React update
     */
    defer?: boolean;
}

/**
 * Defines the Refresh Link Props contract
 */
export interface RefreshLinkProps extends LinkProps {
    /**
     * The NavigationData to pass
     */
    navigationData?: any;
    /**
     * Indicates whether to include all the current NavigationData
     */
    includeCurrentData?: boolean;
    /**
     * The data to add from the current NavigationData
     */
    currentDataKeys?: string | string[];
    /**
     * The style to display when the Link is active
     */
    activeStyle?: any;
    /**
     * The Css Class to display when the Link is active
     */
    activeCssClass?: string;
    /**
     * Indicates whether the Link is disabled when active
     */
    disableActive?: boolean;
}

/**
 * Hyperlink Component the navigates to the current State
 */
export class RefreshLink extends Component<RefreshLinkProps> { }

/**
 * Defines the Navigation Link Props contract
 */
export interface NavigationLinkProps extends RefreshLinkProps {
    /**
     * The key of the State to navigate to
     */
    stateKey: string;
}

/**
 * Hyperlink Component the navigates to a State
 */
export class NavigationLink extends Component<NavigationLinkProps> { }

/**
 * Defines the Navigation Back Link Props contract
 */
export interface NavigationBackLinkProps extends RefreshLinkProps {
    /**
     * Starting at 1, The number of Crumb steps to go back
     */
    distance: number;
}

/**
 * Hyperlink Component the navigates back along the crumb trail
 */
export class NavigationBackLink extends Component<NavigationBackLinkProps> { }

