export type RouteType = {
  routeNumber:        number;
  floor:              string;
  id:                 number;
  title:              string;
  description?:       string;
  userName:           string;
  endDate:            string;
  startDate:          string;
  startTime:          string;
  endTime:            string;
  problemCount:       number;
  userRole:           string;
  secret:             string;
  itemId:             string;
};

export type AreaType = {
  id:                 number;
  routesId:           number;
  areaNumber:         string;
  roomName:           string;
};

export type TodoType = {
  areasId:            number;
  duty:               string;
  id:                 number;
};

export type PossibleProblemsType = {
  id:                 number;
  todoId:             number;
  possibleProblem:    string;
  reaction:           string;
};

export type HistoryDataType = {
  startDate:          string;
  startTime:          string;
  endDate:            string;
  endTime:            string;
  routeNumber:        number | undefined;
  id:                 number;
  userName:           string;
  problemCount:       number;
  pageID:             number;
  routenumber:        number;
  _id:                string;
  secret:             string;
  userRole:           string;
  values: {
      [key: string]: {
        [key: string]: boolean;
      }[]
    },

};

export type UserType = {
  key:                string;
  email:              string;
  secret:             string;
  userRole:           string;
  username:           string;
  dateCreated:        string;
  dateDeleted:        string;
  status:             string;
  _id:                string;
  id:                 number;
};

export type TokenType = {
  username:           string;
  theme:              boolean;
  secret:             string;
  userRole:           string;
  userId:             string;
  iat:                number;
  exp:                number;
};

export type ChecklistPhotosType = {
  photo:              string;
  photoId:            string;
}