import React from 'react'

export const ScheduleModal = () => (
  <script id="customEditorTemplate" type="text/x-kendo-template">
    <div className="container-modal">
      <div className="container-fields">
        {/*Экскурсия*/}
        <div className="outer">
          <div className="k-edit-label"><label htmlFor="title">Экскурсия</label></div>
          <div data-container-for="title" className="k-edit-field">
            <input id="title"
              name="title"
              type="text"
              className="k-input k-textbox" />
          </div>
        </div>

        {/*API*/}
        <div className="outer">
          <div className="k-edit-label"><label htmlFor="tripApi">API</label></div>
          <div data-container-for="tripApi" className="k-edit-field">
            <select id="tripApi"
              data-bind="value:tripApi"
              data-role="dropdownlist"
              data-value-field="value"
              data-text-field="text"></select>
          </div>
        </div>

        <hr />

        {/*Весь день*/}
        <div className="outer">
          <div className="k-edit-label"><label htmlFor="isAllDay">Весь день</label></div>
          <div data-container-for="isAllDay" className="k-edit-field">
            <input type="checkbox" name="isAllDay" data-type="boolean" data-bind="checked:isAllDay" />
          </div>
        </div>

        {/*Начало*/}
        <div className="outer">
          <div className="k-edit-label"><label htmlFor="start">Начало</label></div>
          <div data-container-for="start" className="k-edit-field">
            <input type="text"
              data-role="datetimepicker"
              data-interval="15"
              data-type="date"
              data-bind="value:start,invisible:isAllDay"
              name="start" />
            <input type="text" data-type="date" data-role="datepicker" data-bind="value:start,visible:isAllDay"
              name="start" />
            <span data-bind="text: startTimezone"></span>
            <span data-for="start" className="k-invalid-msg" style={{ display: 'none' }}></span>
          </div>
        </div>

        {/*Конец*/}
        <div className="outer">
          <div className="k-edit-label"><label htmlFor="end">Конец</label></div>
          <div data-container-for="end" className="k-edit-field">
            <input type="text" data-type="date" data-role="datetimepicker"
              data-bind="value:end,invisible:isAllDay"
              name="end" data-datecompare-msg="Окончание должно быть позже, чем начало" />
            <input type="text" data-type="date" data-role="datepicker" data-bind="value:end,visible:isAllDay"
              name="end"
              data-datecompare-msg="Окончание должно быть позже, чем начало" />
            <span data-bind="text: endTimezone"></span>
            <span data-bind="text: startTimezone, invisible: endTimezone"></span>
            <span data-for="end" className="k-invalid-msg" style={{ display: 'none' }}></span>
          </div>
        </div>

        {/*Прекратить продажу*/}
        <div className="outer">
          <div className="k-edit-label"><label htmlFor="buyTime">Прекратить продажу</label></div>
          <div data-container-for="buyTime" className="k-edit-field">
            <input type="text"
              data-role="datetimepicker"
              data-interval="15"
              data-type="date"
              data-bind="value:buyTime,invisible:isAllDay"
              name="buyTime" />
            <input type="text" data-type="date" data-role="datepicker" data-bind="value:buyTime,visible:isAllDay"
              name="buyTime" />
            <span data-bind="text: startTimezone"></span>
            <span data-for="buyTime" className="k-invalid-msg" style={{ display: 'none' }}></span>
          </div>
        </div>

        {/*Расписание из API*/}
        <div className="outer">
          <div className="k-edit-label"><label htmlFor="isApiSchedule">Расписание из API</label></div>
          <div data-container-for="isApiSchedule" className="k-edit-field">
            <div data-bind="value:isApiSchedule" name="isApiSchedule" data-role=""></div>
          </div>
        </div>

        {/*Повторять*/}
        <div className="outer">
          <div className="k-edit-label"><label htmlFor="recurrenceRule">Повторять</label></div>
          <div data-container-for="recurrenceRule" className="k-edit-field">
            <div data-bind="value:recurrenceRule" name="recurrenceRule" data-role="recurrenceeditor"></div>
          </div>
        </div>

        {/*Тип времени*/}
        <div className="outer">
          <div className="k-edit-label"><label htmlFor="ticketType">Тип времени</label></div>
          <div data-container-for="ticketType" className="k-edit-field">
            <select id="ticketType" data-bind="value:ticketType"
              data-role="dropdownlist" data-value-field="value" data-text-field="text"></select>
          </div>
        </div>

        <hr />

        {/*Причал отправления*/}
        <div className="outer">
          <div className="k-edit-label"><label htmlFor="pierStartId">Причал отправления</label></div>
          <div data-container-for="pierStartId" className="k-edit-field">
            <select id="pierStartId" data-bind="value:pierStartId"
              data-role="dropdownlist" data-value-field="value" data-text-field="text"></select>
          </div>
        </div>

        {/*Причал прибытия*/}
        <div className="outer">
          <div className="k-edit-label"><label htmlFor="pierFinishId">Причал прибытия</label></div>
          <div data-container-for="pierFinishId" className="k-edit-field">
            <select id="pierFinishId" data-bind="value:pierFinishId"
              data-role="dropdownlist" data-value-field="value" data-text-field="text"></select>
          </div>
        </div>

        {/*Карта маршрута*/}
        <div className="outer">
          <div className="k-edit-label"><label htmlFor="mapUrl">Карта маршрута</label></div>
          <div data-container-for="mapUrl" className="k-edit-field">
            <input type="text" className="k-input k-textbox" name="mapUrl" data-bind="value:mapUrl" />
            {/*(может быть разная на одном направлении)*/}
          </div>
        </div>

        {/*Транспортное средство*/}
        <div className="outer">
          <div className="k-edit-label"><label htmlFor="vehicleId">Транспортное средство</label></div>
          <div data-container-for="vehicleId" className="k-edit-field">
            <select id="vehicleId" data-bind="value:vehicleId"
              data-role="dropdownlist" data-value-field="value" data-text-field="text"></select>
          </div>
        </div>

        <hr />

        {/*Заметка для менеджера*/}
        <div className="outer">
          <div className="k-edit-label"><label htmlFor="description">Заметка для менеджера</label></div>
          <div data-container-for="description" className="k-edit-field">
            <textarea name="description" className="k-textbox" data-bind="value:description"></textarea>
          </div>
        </div>

        <hr />

        {/*Количество билетов*/}
        <div className="outer">
          <div className="k-edit-label"><label htmlFor="count">Количество билетов</label></div>
          <div data-container-for="count" className="k-edit-field">
            <input name="count" className="k-textbox" data-bind="value:count" />
          </div>
        </div>
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