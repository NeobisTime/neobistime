import React from "react";
import { Scrollbars } from "react-custom-scrollbars";

const MinutesScrollbar = (props: any) => {
  const { value, setValue } = props;
  const minutes = [
    '00',
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
    31,
    32,
    33,
    34,
    35,
    36,
    37,
    38,
    39,
    40,
    41,
    42,
    43,
    44,
    45,
    46,
    47,
    48,
    49,
    50,
    51,
    52,
    53,
    54,
    55,
    56,
    57,
    58,
    59,
  ];
  return (
    <Scrollbars
      autoHide
      autoHideTimeout={1000}
      autoHideDuration={200}
      autoHeight
      autoHeightMin={0}
      autoHeightMax={200}
      thumbMinSize={30}
      universal={true}
      className="create-event__form-scroll"
      style={{ width: 50, height: 200 }}
    >
      <div className="create-event__form-number create-event__form-number_active">
        м.
      </div>
      {minutes.map((number) => {
        return (
          <div
            key={number}
            className={
              number == value
                ? "create-event__form-number create-event__form-number_active-number"
                : "create-event__form-number"
            }
            onClick={() => {
              setValue(+number);
            }}
          >
            {number}
          </div>
        );
      })}
    </Scrollbars>
  );
};

export default MinutesScrollbar;
