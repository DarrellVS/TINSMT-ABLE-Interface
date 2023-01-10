export interface CalendarType {
  allowedOnlineMeetingProviders: string[];
  canEdit: boolean;
  canShare: boolean;
  canViewPrivateItems: boolean;
  changeKey: string;
  color: "string";
  defaultOnlineMeetingProvider: string;
  hexColor: string;
  id: string;
  isDefaultCalendar: boolean;
  isRemovable: boolean;
  isTallyingResponses: boolean;
  name: string;
  owner: {
    address: string;
    name: string;
  } | null;
}
