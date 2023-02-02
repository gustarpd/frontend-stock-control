import { IconProps } from "phosphor-react";

export type SideBarTypes = {
  title: string;
  icon: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >;
  link: string;
};
