package com.bugenzhao.bookstore_backend.entity;

import java.util.Date;

import lombok.*;

@Data
@AllArgsConstructor
public class FromTo {
    private Date from;
    private Date to;
}
