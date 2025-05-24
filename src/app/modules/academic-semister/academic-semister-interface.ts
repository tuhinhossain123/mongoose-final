type TMonth =
  | 'Jan'
  | 'Feb'
  | 'Mar'
  | 'Apr'
  | 'May'
  | 'Jun'
  | 'Jul'
  | 'Aug'
  | 'Sep'
  | 'Oct'
  | 'Nov'
  | 'Dec';

export type TAcademicSemester = {
  name: 'Autumn' | 'Summar' | 'Fall';
  code: '01' | '02' | '03';
  year: Date;
  startMonth: TMonth;
  endMonth: TMonth;
};
