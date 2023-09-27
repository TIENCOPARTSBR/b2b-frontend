// components/DataTableStyles.js
import styled from 'styled-components';

export const Card = styled.div`
  --bs-card-spacer-y: 25px;
  --bs-card-spacer-x: 25px;
  --bs-card-title-spacer-y: 0.5rem;
  --bs-card-title-color: ;
  --bs-card-subtitle-color: ;
  --bs-card-border-width: 1px;
  --bs-card-border-color: #e7eaee;
  --bs-card-border-radius: 12px;
  --bs-card-box-shadow: 0px 8px 24px rgba(27, 46, 94, 0.08);
  --bs-card-inner-border-radius: calc(12px - 1px);
  --bs-card-cap-padding-y: 25px;
  --bs-card-cap-padding-x: 25px;
  --bs-card-cap-bg: transparent;
  --bs-card-cap-color: ;
  --bs-card-height: ;
  --bs-card-color: ;
  --bs-card-bg: #ffffff;
  --bs-card-img-overlay-padding: 1.25rem;
  --bs-card-group-margin: 0.75rem;
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 100%;
  word-wrap: break-word;
  background-color: #ffffff;
  background-clip: border-box;
  border: 1px solid #e7eaee;
  border-radius: 12px;
  margin-bottom: 24px;
  transition: box-shadow 0.2s ease-in-out;
`;

export const CardBody = styled.div`
  flex: 1 1 auto;
`;

export const FormSelect = styled.select`
  display: block;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  color: #131920;
  font-family: 'Roboto', sans-serif;
  background-color: #ffffff;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%231d2630' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 16px 12px;
  border: 1px solid #bec8d0;
  border-radius: 8px;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  padding-top: 0.375rem;
  padding-bottom: 0.375rem;
  padding-left: 0.6rem;
  padding-right: 2.5rem;
  font-size: 0.765625rem;
  border-radius: 6px;
  width: auto;
  display: inline-block;
  margin: 0 1rem;

  &:focus {
    outline-color: #FBBB21;
  }
`;

export const Td = styled.td`
  padding: 0.5rem 1rem !important;

  &:last-child {
    text-align: right;
  }
`;

export const FormControl = styled.input`
  font-size: 0.875rem;
  line-height: 1.4375em;
  font-family: "Inter", sans-serif;
  font-weight: 400;
  color: rgb(29, 38, 48);
  box-sizing: border-box;
  cursor: text;
  display: inline-flex;
  align-items: center;
  position: relative;
  border-radius: 8px;
  background: none;
  height: 1.4375em;
  margin: 0px;
  display: block;
  min-width: 0px;
  height: 50px;
  padding: 14px;
  text-align: left;
  margin: 0px;
  padding: 0px 20px;
  border-style: solid;
  border-width: 1px;
  border-color: rgb(190, 200, 208);
  position: relative;
  padding-left: 42px;

  &:focus {
    outline-color: #FBBB21 !important;
  }

  &:placeholder {
    color: #A3A6AA;
  }
`;

export const IconSearch = styled.span`
  position: absolute;
  top: 17px;
  left: 16px;
  width: 21px;
  height: 21px;
  background-image: url('/icons/search.svg');
  background-repeat: no-repeat;
`;

export const CardHeader = styled.div`
  padding: var(--bs-card-cap-padding-y) var(--bs-card-cap-padding-x);
  margin-bottom: 0;
  color: var(--bs-card-cap-color);
  background-color: var(--bs-card-cap-bg);
  border-bottom: var(--bs-card-border-width) solid var(--bs-card-border-color);
  border-radius: var(--bs-card-inner-border-radius) var(--bs-card-inner-border-radius) 0 0;
  border-bottom: 1px solid var(--bs-card-border-color);
  width: 100%;
  display: flex;
  align-items: center;
`;

export const SubTitle = styled.p`
  color: #414141;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  line-height: 25px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin: 0;
`;

export const Paragraph = styled.p`
  color: #414141;
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  line-height: 25px;
  font-style: normal;
  font-weight: 400;
  margin: 0;
`;

export const CardHead = styled.div`
  padding: 20px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Thead = styled.thead`
  background-color: #F8F9FA;
  border-top: 1px solid rgba(219, 224, 229, 0.65);
  border-bottom: 2px solid rgba(219, 224, 229, 0.65);

  td {
    background: none !important;
    line-height: 1.5rem;
    font-family: "Inter", sans-serif;
    text-align: left;
    color: rgb(29, 38, 48);
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    padding: 0.8rem 1.5rem!important;
  }
`;

export const Tbody = styled.tbody`
  background-color: #F8F9FA;
  border-top: 1px solid rgba(219, 224, 229, 0.65);
  border-bottom: 2px solid rgba(219, 224, 229, 0.65);

  tr {
    background: #fff;

    &:hover {
      background: rgb(248, 249, 250) !important;
    }
  }

  td {
    background: none!important;
    line-height: 1.66;
    font-family: "Inter", sans-serif;
    font-weight: 400;
    display: table-cell;
    vertical-align: inherit;
    border-bottom: 1px solid rgba(219, 224, 229, 0.65);
    text-align: left;
    color: rgb(29, 38, 48);
    font-size: 0.875rem;
    padding: 12px;
    border-top-color: rgba(219, 224, 229, 0.65);
    border-right-color: rgba(219, 224, 229, 0.65);
    border-left-color: rgba(219, 224, 229, 0.65);
    padding: 0.8rem 1.5rem!important;
  }
`;


export const PageCount = styled.div`
  margin: 0px;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  font-family: "Inter", sans-serif;
  color: rgb(91, 107, 121);
`;

export const CardFooter = styled.div`
  padding: 15px 20px 15px;
  align-items: center;
`;

export const ButtonPagination = styled.button`
  display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    -webkit-tap-highlight-color: transparent;
    background-color: transparent;
    outline: 0px;
    cursor: pointer;
    user-select: none;
    vertical-align: middle;
    appearance: none;
    text-decoration: none;
    font-size: 14px;
    line-height: 19px;
    font-family: "Inter", sans-serif;
    font-weight: 400;
    border-radius: 8px;
    text-align: center;
    box-sizing: border-box;
    min-width: 32px;
    height: 32px;
    padding: 0px 6px;
    margin: 0px 3px;
    color: rgb(29, 38, 48);
    transition: color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    border: 1px solid rgba(219, 224, 229, 0.65);

    &:focus,
    &:hover {
      border: 2px solid #FBBB21;
    }
`;

export const Table = styled.table`
  margin: 0;
`;

export const TitleCard = styled.h2`
  margin: 0px;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.57;
  font-family: "Inter", sans-serif;
  display: block;
  color: rgb(29, 38, 48);
`;