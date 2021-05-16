import { RouteProp, NavigationHelpers, DrawerNavigationState } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { DrawerNavigationProp,  } from "@react-navigation/drawer";
import { DrawerNavigationEventMap, DrawerDescriptorMap } from "@react-navigation/drawer/lib/typescript/src/types";

/*
lists types for auth stack navigation screen parameters
undefined means that the routes doesn't have params
*/
export type AuthStackParamList = {
    Login: undefined;
    Register: undefined;
};

/*
props for auth stack navigation screens
T is generic type and we pass screen name in that stack as a type
you can access params by passing screen name to access screen props
*/
export type AuthNavProps<T extends keyof AuthStackParamList> = {
    navigation: StackNavigationProp<AuthStackParamList, T>;
    route: RouteProp<AuthStackParamList, T>;
};

/*
lists types for home stack navigation screen parameters
undefined means that the routes doesn't have params
*/
export type HomeStackParamList = {
    Home: undefined;
    AddToDoScreen: undefined;
    EditToDoScreen: {
        title: string,
        dueDate: string,
        completed: false,
        content: string,
        created: string,
        due_date: string,
        id: number
    };
};

/*
props for home stack navigation screens
T is generic type and we pass screen name in that stack as a type
you can access params by passing screen name to access screen props
*/
export type HomeNavProps<T extends keyof HomeStackParamList> = {
    navigation: StackNavigationProp<HomeStackParamList, T>;
    route: RouteProp<HomeStackParamList, T>;
};

/*
lists types for drawer navigation screen parameters
undefined means that the routes doesn't have params
*/
export type DrawerParamList = {
    Home: undefined;
    About: undefined;
};

/*
props for drawer navigation screens
T is generic type and we pass screen name in that stack as a type
you can access params by passing screen name to access screen props
*/
export type DrawerNavProps<T extends keyof DrawerParamList> = {
    navigation: DrawerNavigationProp<DrawerParamList, T> & NavigationHelpers<Record<string, object>, DrawerNavigationEventMap>;
    route: RouteProp<DrawerParamList, T>;
    jumpTo: RouteProp<DrawerParamList, T>;
    state: DrawerNavigationState; //The navigation state of the navigator, state.routes contains list of all routes
    descriptors: DrawerDescriptorMap; //An descriptor object containing options for the drawer screens. The options can be accessed at descriptors[route.key].options.
};
