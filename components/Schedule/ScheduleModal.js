import React from 'react'

class Outer extends React.Component {
  render() {
    return (
      <div className="outer">
        <div className="k-edit-label"><label htmlFor={this.props.name}>{this.props.title}</label></div>
        <div data-container-for={this.props.name} className="k-edit-field">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export const ScheduleModal = () => (
  <script id="customEditorTemplate" type="text/x-kendo-template">
    <div className="container-modal">
      <div className="container-fields">

        <Outer name="title" title="Экскурсия">
          <input id="title" name="title" type="text" className="k-input k-textbox" />
        </Outer>

        <Outer name="tripApi" title="API">
          <select id="tripApi"
                  data-bind="value:tripApi" data-role="dropdownlist"
                  data-value-field="value" data-text-field="text"></select>
        </Outer>

        <hr />

        <Outer name="isAllDay" title="Весь день">
          <input type="checkbox" name="isAllDay" data-type="boolean" data-bind="checked:isAllDay" />
        </Outer>

        <Outer name="start" title="Начало">
          <input type="text" name="start"
                 data-role="datetimepicker" data-interval="15" data-type="date"
                 data-bind="value:start,invisible:isAllDay" />
          <input type="text" name="start"
                 data-type="date" data-role="datepicker" data-bind="value:start,visible:isAllDay"
                  />
          <span data-bind="text: startTimezone"></span>
          <span data-for="start" className="k-invalid-msg" style={{ display: 'none' }}></span>
        </Outer>

        <Outer name="end" title="Конец">
          <input type="text" name="end"
                 data-type="date" data-role="datetimepicker" data-bind="value:end,invisible:isAllDay"
                 data-datecompare-msg="Окончание должно быть позже, чем начало" />
          <input type="text" name="end"
                 data-type="date" data-role="datepicker" data-bind="value:end,visible:isAllDay"
                 data-datecompare-msg="Окончание должно быть позже, чем начало" />
          <span data-bind="text: endTimezone"></span>
          <span data-bind="text: startTimezone, invisible: endTimezone"></span>
          <span data-for="end" className="k-invalid-msg" style={{ display: 'none' }}></span>
        </Outer>

        <Outer name="buyTime" title="Прекратить продажу">
          <input type="text" name="buyTime"
                 data-role="datetimepicker" data-interval="15" data-type="date"
                 data-bind="value:buyTime,invisible:isAllDay" />
          <input type="text" name="buyTime"
                 data-type="date" data-role="datepicker" data-bind="value:buyTime,visible:isAllDay" />
          <span data-bind="text: startTimezone"></span>
          <span data-for="buyTime" className="k-invalid-msg" style={{ display: 'none' }}></span>
        </Outer>

        <Outer name="isApiSchedule" title="Расписание из API">
          <div name="isApiSchedule" data-bind="value:isApiSchedule" data-role=""></div>
        </Outer>

        <Outer name="recurrenceRule" title="Повторять">
          <div data-bind="value:recurrenceRule" name="recurrenceRule" data-role="recurrenceeditor"></div>
        </Outer>

        <Outer name="ticketType" title="Тип времени">
          <select id="ticketType" data-bind="value:ticketType"
                  data-role="dropdownlist" data-value-field="value" data-text-field="text"></select>
        </Outer>

        <hr />

        <Outer name="pierStartId" title="Причал отправления">
          <select id="pierStartId"
                  data-bind="value:pierStartId" data-role="dropdownlist"
                  data-value-field="value" data-text-field="text"></select>
        </Outer>

        <Outer name="pierFinishId" title="Причал прибытия">
          <select id="pierFinishId"
                  data-bind="value:pierFinishId" data-role="dropdownlist"
                  data-value-field="value" data-text-field="text"></select>
        </Outer>

        <Outer name="mapUrl" title="Карта маршрута">
          <input type="text" className="k-input k-textbox" name="mapUrl" data-bind="value:mapUrl" />
          {/*(может быть разная на одном направлении)*/}
        </Outer>

        <Outer name="vehicleId" title="Транспортное средство">
          <select id="vehicleId"
                  data-bind="value:vehicleId" data-role="dropdownlist"
                  data-value-field="value" data-text-field="text"></select>
        </Outer>

        <hr />

        <Outer name="description" title="Заметка для менеджера">
          <textarea name="description" className="k-textbox" data-bind="value:description"></textarea>
        </Outer>

        <hr />

        <Outer name="count" title="Количество билетов">
          <input name="count" className="k-textbox" data-bind="value:count" />
        </Outer>

      </div>

      {/*Билеты*/}
      <div className="container container-additionally">
        <hr />
        <h3>Билеты</h3>
        <div id="grid-ticket"></div>
      </div>

      {/*Доп. услуги*/}
      <div className="container container-additionally">
        <hr />
        <h3>Доп. услуги</h3>
        <div id="grid-additional"></div>
      </div>

    </div>
  </script>
)